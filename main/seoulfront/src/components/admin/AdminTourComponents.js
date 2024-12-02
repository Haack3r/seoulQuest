import React, { useEffect, useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
} from '@mui/material';

import {
    Add as AddIcon,   // // 'Add' 아이콘을 'AddIcon'이라는 이름으로 가져옴
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import TourForm from './ui/TourForm';
import useCustomLogin from '../../hooks/useCustomLogin';
import { addTour, adminTourList, deleteTour, getTour, modifyTour } from '../../api/AdminApi';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
};

const AdminTourComponents = () => {
    const [serverData, setServerData] = useState(initState)
    const [isEditing, setIsEditing] = useState(false)
    const [tabValue, setTabValue] = useState(0);  // tabValue: 현재 선택된 탭을 나타내며, 기본값은 0
    const [tours, setTours] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);  // 대화상자 (모달창)가 열려있는지 여부를 저장하는 상태
    const [dialogType, setDialogType] = useState('');

    const [selectedTno, setSelectedTno] = useState(null)
    const [selectedTour, setSelectedTour] = useState(null);  // 이미지 미리보기 URL 목록을 저장하는 상태

    // const [imagePreview, setImagePreview] = useState([]);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(9);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("t");

    const { exceptionHandle } = useCustomLogin();

    const [tourForm, setTourForm] = useState({
        tname: '',
        tdesc: '',
        tprice: '',
        maxCapacity: '',
        tlocation: '',
        taddress: '',
        categoryName: '',
        tDate: [],
        uploadFileNames: []
    });

    const fetchTourList = () => {
        console.log("투어 목록 요청:", {
            페이지: page,
            사이즈: size,
            검색어: keyword,
            타입: type,
        });

        adminTourList({ page, size, keyword, type })
            .then((data) => {
                setTourForm(data);
            })
            .catch((err) => {
                console.error("데이터 조회 실패:", err);
                exceptionHandle(err);
            })
    };

    const handlePageChange = (newPage) => {
        console.log('페이지 변경 시도:', {
            현제페이지: page,
            새페이지: newPage,
            전체페이지: serverData.totalPage,
        })

        try {
            setPage(newPage)
        } catch (err) {
            console.error("페이지 변경 중 오류 발생 : ", err)
        }
    }

    const handleAddTour = async (formData) => {
        try {
            const response = await addTour(formData);
            console.log("투어 등록 결과:", response);
            await fetchTourList();
            setOpenDialog(false);
            setIsEditing(false);
            setSelectedTour(null);
        } catch (error) {
            console.error("투어 등록 실패:", error);
            exceptionHandle(error);
        }
    };

    const handleModifyTour = (formData) => {
        if (!selectedTour) return;
        modifyTour(selectedTour.tno, formData)
            .then(() => {
                fetchTourList();
                setOpenDialog(false);
                setIsEditing(false);
                setSelectedTour(null);
            })
            .catch((error) => {
                console.error("Modify or fetch error:", error);
                exceptionHandle(error);
            })
    };

    const handleEdit = (tno) => {
        getTour(tno)
            .then((data) => {
                setOpenDialog(true);
                setIsEditing(true);
                setSelectedTour(data);
            })
            .catch((error) => {
                console.error("Get tour error:", error);
                exceptionHandle(error);
            });
    };

    const handleDelete = (tno) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            deleteTour(tno);
            alert("삭제되었습니다");
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error("Delete error:", error);
            exceptionHandle(error);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setIsEditing(false);
        setSelectedTour(null);
        fetchTourList();
    };

    const handleFormSubmit = (formData) => {
        if (isEditing) {
            handleModifyTour(formData);
        } else {
            handleAddTour(formData);
        }
    };

    useEffect(() => {
        fetchTourList();
    }, [page, size, keyword, type]);

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="진행중" />
                    <Tab label="예정됨" />
                    <Tab label="종료됨" />
                </Tabs>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setOpenDialog(true);
                        setDialogType('add');
                        setIsEditing(false);
                        setSelectedTour(null);
                    }}
                >
                    새 투어 추가
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>투어명</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell>잔여석</TableCell>
                            <TableCell>가격</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serverData.dtoList?.map((tour) => (
                            <TableRow key={tour.tno}>
                                <TableCell>{tour.tname}</TableCell>
                                <TableCell>{tour.tDate}</TableCell>
                                <TableCell>{tour.maxCapacity}</TableCell>
                                <TableCell>{tour.tprice?.toLocaleString()}원</TableCell>
                                <TableCell>{tour.status}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(tour.tno)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(tour.tno)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {openDialog && (
                <TourForm
                    isEditing={isEditing}
                    initialData={selectedTour}
                    onSubmit={handleFormSubmit}
                    onClose={handleClose}
                />
            )}
        </Box>
    )
}
{/* <Dialog
                    open={openDialog}
                    onClose={resetForm}
                    maxWidth="md" // 다이얼로그의 최대 너비를 'md'로 설정
                    fullWidth     // 화면 너비에 맞게 전체적으로 확장되도록 설정
                >
                    <DialogTitle>
                        {dialogType === 'add' ? '새 투어 추가' : '투어 수정'}
                    </DialogTitle>

                    <DialogContent>
                        <Box component="form" onSubmit={handleTourSubmit} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ width: '100%' }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="투어명"
                                        value={tourForm.name}
                                        onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <TextField
                                            fullWidth
                                            required
                                            type="datetime-local"
                                            label="일정"
                                            value={tourForm.date}
                                            onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                                            slotProps={{ inputLabel: { shrink: true } }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <TextField
                                            fullWidth
                                            required
                                            type="number"
                                            label="최대 참가 인원"
                                            value={tourForm.maxParticipants}
                                            onChange={(e) => setTourForm({ ...tourForm, maxParticipants: e.target.value })}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ width: '100%' }}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        label="가격"
                                        value={tourForm.price}
                                        onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })}
                                    />
                                </Box>

                                <Box sx={{ width: '100%' }}>
                                    <TextField
                                        fullWidth
                                        required
                                        multiline
                                        rows={4}
                                        label="투어 설명"
                                        value={tourForm.description}
                                        onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                                    />
                                </Box>

                                <Box sx={{ width: '100%' }}>
                                    <Button
                                        variant="contained" // 버튼 스타일을 기본형으로 설정
                                        component="label"
                                        startIcon={<UploadIcon />}
                                    >
                                        이미지 업로드
                                        <input
                                            type="file"
                                            hidden    // 실제 <input>은 화면에 보이지 않도록 설정
                                            multiple  // 여러 파일을 선택할 수 있도록 설정
                                            accept="image/*"  // 이미지 파일만 선택 가능하도록 설정
                                            onChange={handleImageUpload}
                                        />
                                    </Button>
                                </Box>

                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {imagePreview.map((image, index) => (
                                            <Card key={index} sx={{ width: 150 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={image}
                                                    alt={`미리보기 ${index + 1}`}
                                                />
                                                <CardContent>
                                                    <IconButton
                                                        onClick={() => {
                                                            setImagePreview(prev => prev.filter((_, i) => i !== index));
                                                            setTourForm(prev => ({
                                                                ...prev, images: prev.images.filter((_, i) => i !== index)
                                                            }));
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                </Box>

                                <Box sx={{ width: '100%' }}>
                                    <Button
                                        type="submit"
                                        variant="contained" // contained는 배경색이 채워진 버튼을 나타냄
                                        fullWidth
                                        disabled={!tourForm.name || !tourForm.date || !tourForm.maxParticipants || !tourForm.price}
                                    >
                                        {dialogType === 'add' ? '투어 추가' : '투어 수정'}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>

                </Dialog> */}

export default AdminTourComponents;