import React, { useState, useEffect } from 'react';
import { addTour, modifyTour, deleteTourImage } from '../../../api/AdminApi';
import { Box, Dialog, DialogTitle, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const host = `http://localhost:8080/api`;
const MAX_IMAGES = 10;

const CATEGORIES = [
    { value: "Historical & Cultural Sites", label: "Historical & Cultural Sites" },
    { value: "Shopping & Lifestyle", label: "Shopping & Lifestyle" },
    { value: "Landmarks & Scenic Views", label: "Landmarks & Scenic Views" },
    { value: "Nature & Outdoor", label: "Nature & Outdoor" },
    { value: "Art & Creativity", label: "Art & Creativity" },
];

const initState = {
    tno: 0,
    tname: '',
    tdesc: '',
    tprice: 0,
    maxCapacity: 0,
    taddress: '',
    categoryName: '',
    categoryType: 'tour',
    tdate: [],
    files: []
};

const TourForm = ({ isEditing, initialData, onClose, selectedTno }) => {
    const [tour, setTour] = useState(isEditing ? initialData : { ...initState });
    const [uploadQueue, setUploadQueue] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    useEffect(() => {
        setTour(prev => ({
            ...prev,
            categoryType: "tour"
        }));
    }, [isEditing]);

    const handleDateChange = (dates) => {
        if (!dates) {
            setTour(prev => ({
                ...prev,
                tdate: []
            }));
            return;
        }

        const [startDate, endDate] = dates;
        const dateArray = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            dateArray.push(currentDate.format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'day');
        }

        setTour(prev => ({
            ...prev,
            tdate: dateArray
        }));
    };

    const handleChangeTour = (e) => {
        const { name, value } = e.target;

        if (name === 'categoryName') {
            setTour({
                ...tour,
                categoryName: value,
                categoryType: "tour"
            });
        } else if (name === 'taddress') {
            // 입력은 자유롭게 허용하고, 제출할 때만 검증
            setTour({
                ...tour,
                taddress: value
            });
        } else {
            setTour({
                ...tour,
                [name]: value
            });
        }
        console.log("투어 데이터 : ", tour);
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files || []);
        if (!newFiles.length) return;

        const currentFiles = tour.files || [];
        const totalFiles = currentFiles.length + newFiles.length;

        if (totalFiles > MAX_IMAGES) {
            alert(`이미지는 최대 ${MAX_IMAGES}개까지만 선택 가능합니다.`);
            return;
        }

        if (!newFiles.every(file => file.type.startsWith('image/'))) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        setTour(prev => ({
            ...prev,
            files: [...currentFiles, ...newFiles]
        }));
    };

    const removeFile = (index) => {
        if (isEditing && tour.uploadFileNames && tour.uploadFileNames[index]) {
            const fileName = tour.uploadFileNames[index];
            setRemovedImages(prev => [...prev, { fileName, tno: tour.tno }]);
        }

        setTour(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index),
            uploadFileNames: prev.uploadFileNames ?
                prev.uploadFileNames.filter((_, i) => i !== index) :
                []
        }));
    };

    useEffect(() => {
        return () => {
            uploadQueue.forEach(item => {
                URL.revokeObjectURL(item.preview);
            });
            if (tour.files) {
                tour.files.forEach(file => {
                    if (file instanceof File) {
                        URL.revokeObjectURL(URL.createObjectURL(file));
                    }
                });
            }
        };
    }, [uploadQueue, tour.files]);

    const handleClickSubmit = async (e) => {
        e.preventDefault();

        // 주소 형식 검증
        const addressPattern = /^[\w\s-]+,\s*[\w\s-]+-gu,\s*Seoul$/;
        if (!addressPattern.test(tour.taddress)) {
            alert('주소는 "상세주소, 구-gu, Seoul" 형식으로 입력해주세요.\n예: 161 Sajik-ro, Jongno-gu, Seoul');
            return;
        }

        // selectedPno가 없을 경우 initialData.pno 사용
        const tno = isEditing ? selectedTno : initialData?.tno || tour.tno;

        if (isEditing && !tour.tno) {
            alert('투어 번호가 유효하지 않습니다.');
            return;
        }

        const formData = new FormData();

        formData.append("tname", tour.tname)
        formData.append("tdesc", tour.tdesc)
        formData.append("tprice", tour.tprice)
        formData.append("maxCapacity", tour.maxCapacity)
        formData.append("taddress", tour.taddress)
        formData.append("categoryName", tour.categoryName)
        // formData.append("tourDate", JSON.stringify(tour.tourDate))
        // formData.append("tourDate[]", tour.tourDate)

        tour.tdate.forEach(date => {
            formData.append("tdate", date);
            console.log("tdate added:", date);
        });

        if (tour.files?.length > 0) {
            tour.files.forEach(file => {
                if (file instanceof File) {
                    formData.append("files", file);
                }
            });
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        try {
            if (isEditing) {
                if (removedImages.length > 0) {
                    for (const image of removedImages) {
                        await deleteTourImage(image.tno, image.fileName);
                    }
                }
                await modifyTour(tour.tno, formData);
                alert('투어가 수정되었습니다.');
            } else {
                await addTour(formData);
                console.log(formData);
                alert('투어가 등록되었습니다.');
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('투어 처리 중 오류:', error);
            alert('처리 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (isEditing && initialData) {
            const loadInitialImages = async () => {
                if (initialData.uploadFileNames?.length > 0) {
                    try {
                        const filePromises = initialData.uploadFileNames.map(async fileName => {
                            const response = await fetch(`${host}/tour/image/${fileName}`);
                            const blob = await response.blob();
                            return new File([blob], fileName, { type: blob.type });
                        });
                        const files = await Promise.all(filePromises);
                        setTour({
                            ...initialData,
                            files: files
                        });
                    } catch (error) {
                        console.error('이미지 로드 실패:', error);
                    }
                }
            };
            loadInitialImages();
        }
    }, [isEditing, initialData]);

    useEffect(() => {
        if (isEditing && initialData && initialData.tdate) {
            // 문자열로 된 tourDate를 파싱
            let dates;
            try {
                dates = typeof initialData.tdate === 'string'
                    ? JSON.parse(initialData.tdate)
                    : initialData.tdate;
            } catch (e) {
                dates = initialData.tdate;
            }

            // 날짜 배열이 있으면 설정
            if (Array.isArray(dates) && dates.length > 0) {
                setTour(prev => ({
                    ...prev,
                    tdate: dates
                }));
            }
        }
    }, [isEditing, initialData]);

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {isEditing ? '투어 수정' : '새 투어 추가'}
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleClickSubmit} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="투어명"
                            name="tname"
                            value={tour.tname}
                            onChange={handleChangeTour}
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">카테고리</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                name="categoryName"
                                label="카테고리"
                                value={tour.categoryName}
                                onChange={handleChangeTour}
                                required
                            >
                                {CATEGORIES.map(category => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* 
                        <TextField
                            fullWidth
                            label="위치"
                            name="tlocation"
                            value={tour.tlocation}
                            onChange={handleChangeTour}
                            required
                        /> */}

                        <TextField
                            fullWidth
                            label="주소"
                            name="taddress"
                            value={tour.taddress}
                            onChange={handleChangeTour}
                            required
                            helperText="예시: 161 Sajik-ro, Jongno-gu, Seoul"
                            placeholder="상세주소, 구-gu, Seoul"
                        />

                        <RangePicker
                            style={{
                                width: '100%',
                                zIndex: 9999
                            }}
                            value={tour.tdate && tour.tdate.length >= 2 ? [
                                dayjs(tour.tdate[0]),
                                dayjs(tour.tdate[tour.tdate.length - 1])
                            ] : null}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                            placeholder={['시작 날짜', '종료 날짜']}
                            popupStyle={{ zIndex: 9999 }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="투어 설명"
                            name="tdesc"
                            value={tour.tdesc}
                            onChange={handleChangeTour}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="가격"
                                name="tprice"
                                value={tour.tprice}
                                onChange={handleChangeTour}
                                required
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="최대 인원"
                                name="maxCapacity"
                                value={tour.maxCapacity}
                                onChange={handleChangeTour}
                                required
                            />
                        </Box>

                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<UploadIcon />}
                        >
                            이미지 업로드
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>

                        {/* 이미지 미리보기 */}
                        {tour.files?.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {tour.files.map((file, index) => (
                                    <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '4px'
                                            }}
                                        />
                                        <Button
                                            onClick={() => removeFile(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                minWidth: '24px',
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '12px',
                                                p: 0,
                                                bgcolor: 'error.main',
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: 'error.dark'
                                                }
                                            }}
                                        >
                                            ×
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {isEditing ? '수정하기' : '등록하기'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onClose}
                            >
                                취소
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TourForm;
