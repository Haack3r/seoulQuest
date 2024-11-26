import React, { useState } from 'react';
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
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    IconButton,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';

import {
    Add as AddIcon,   // // 'Add' 아이콘을 'AddIcon'이라는 이름으로 가져옴
    Edit as EditIcon,
    Delete as DeleteIcon,
    Upload as UploadIcon,
} from '@mui/icons-material';

const AdminTourComponents = () => {
    const [tabValue, setTabValue] = useState(0);  // tabValue: 현재 선택된 탭을 나타내며, 기본값은 0
    const [tours, setTours] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);  // 대화상자 (모달창)가 열려있는지 여부를 저장하는 상태
    const [dialogType, setDialogType] = useState('');
    const [selectedTour, setSelectedTour] = useState(null);  // 이미지 미리보기 URL 목록을 저장하는 상태
    const [imagePreview, setImagePreview] = useState([]);

    const [tourForm, setTourForm] = useState({
        name: '',
        date: '',
        maxParticipants: '',  // 최대 참가자 수
        price: '',
        description: '',
        location: '',
        duration: '',
        images: [],
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // 사용자가 업로드한 파일 목록을 배열로 변환
        setTourForm(prev => ({
            ...prev,  // 기존 `tourForm` 객체의 속성을 유지
            images: [...prev.images, ...files]   // 이전 이미지 배열에 새 파일을 추가한 새로운 배열을 만듦
        }));

        // // 각 파일에 대해 `FileReader` 객체를 생성하여 이미지를 읽음
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file); // 파일을 Base64 형식으로 읽기 위해 `readAsDataURL` 메서드를 호출
        });
    };

    const handleTourSubmit = async (e) => {
        e.preventDefault(); // 이벤트 기본 동작 (페이지 새로고침)을 방지함
        try {
            const tourDate = new Date(tourForm.date); // tourForm.date에 저장된 투어 날짜 문자열을 Date 객체로 변환
            const currentDate = new Date();  // 현재 시점의 날짜와 시간을 나타내는 Date 객체를 생성

            let status;
            if (tourDate.toDateString() === currentDate.toDateString()) {
                status = '진행중';
            } else if (tourDate > currentDate) {
                status = '예정됨';
            } else {
                status = '종료됨';
            }

            const newTour = {
                id: tours.length + 1,
                ...tourForm,            // tourForm에 입력된 데이터를 모두 복사하여 투어 객체에 포함
                currentParticipants: 0, // 초기 참가자 수를 0으로 설정
                status,
                imageUrls: imagePreview, // 이미지 미리보기 URL 배열을 imageUrls로 설정
            };

            if (dialogType === 'add') {
                setTours(prev => [...prev, newTour]);
                alert('투어가 추가되었습니다.');
            } else {

                // setTours 함수를 사용하여 selectedTour.id와 일치하는 투어를 newTour로 대체
                setTours(prev => prev.map(tour =>
                    tour.id === selectedTour.id ? newTour : tour
                ));
                alert('투어가 수정되었습니다.');
            }
            resetForm();

            // 오류가 발생할 경우 해당 오류를 콘솔에 출력하고, 사용자에게 경고창을 표시
        } catch (error) {
            console.error('Error:', error);
            alert('오류가 발생했습니다.');
        }
    };

    const resetForm = () => {

        // 투어 정보를 초기 상태로 되돌리기 위해 setTourForm을 호출
        setTourForm({
            name: '',
            date: '',
            maxParticipants: '',
            price: '',
            description: '',
            location: '',
            duration: '',
            images: [],
        });
        setImagePreview([]);  // 미리보기 배열을 초기화하여 이전에 선택된 이미지들이 표시되지 않도록 함
        setOpenDialog(false); // 폼 대화상자(모달)를 닫아 투어 추가 및 수정 모드를 종료
    };

    const handleDeleteTour = (tourId) => {
        if (window.confirm('이 투어를 삭제하시겠습니까?')) {

            // prev는 이전 tours 상태이고, .filter 메서드를 사용하여 tourId와 일치하지 않는 투어만 남김
            setTours(prev => prev.filter(tour => tour.id !== tourId));
            alert('투어가 삭제되었습니다.');
        }
    };

    const filterToursByStatus = (status) => {
        const currentDate = new Date();
        switch (status) {
            case 'current': // (오늘 진행 중인 투어) 필터링
                return tours
                    .filter(tour => { // tour.date를 Date 객체로 변환한 후, 현재 날짜와 동일한 날짜인 투어만 선택
                        const tourDate = new Date(tour.date);
                        return tourDate.toDateString() === currentDate.toDateString();  // 오늘 날짜와 동일한 날짜만 필터링
                    }).map(tour => ({  // 필터링된 투어에 status 값을 '진행중'으로 설정하여 반환
                        ...tour,
                        status: '진행중'
                    }));

            case 'upcoming':
                return tours.filter(tour => {
                    const tourDate = new Date(tour.date);
                    return tourDate > currentDate;
                }).map(tour => ({
                    ...tour,
                    status: '예정됨'
                }));

            case 'past':
                return tours.filter(tour => {
                    const tourDate = new Date(tour.date);
                    return tourDate < currentDate;
                }).map(tour => ({
                    ...tour,
                    status: '종료됨'
                }));

            default:
                return [];
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case '진행중':
                return { color: 'green', fontWeight: 'bold' };
            case '예정됨':
                return { color: 'blue', fontWeight: 'bold' };
            case '종료됨':
                return { color: 'red', fontWeight: 'bold' };
            default:
                return {};
        }
    };

    return (
        <div className="p-8 bg-gray-100">

            {/* 내부 여백을 3 단위로 설정 */}
            <Box sx={{ p: 3 }}>

                <Button
                    variant="contained" // contained 스타일로 버튼을 설정하여 배경색이 있는 버튼을 만듭
                    startIcon={<AddIcon />} // 버튼의 왼쪽에 `AddIcon` 아이콘을 추가
                    onClick={() => {
                        setDialogType('add');
                        setOpenDialog(true);
                    }}
                    sx={{ mb: 3 }}  // 버튼 아래쪽 마진을 3 단위로 설정
                >
                    새 투어 추가
                </Button>

                {/* 탭을 변경할 때마다 실행되는 함수 */}
                {/* 새로 선택된 탭의 값 (newValue)을 tabValue 상태에 저장 */}
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="현재 진행 중인 투어" />
                    <Tab label="예정된 투어" />
                    <Tab label="종료된 투어" />
                </Tabs>

                {/* Paper 컴포넌트를 사용하여 테이블을 감싸는 외각 요소에 배경과 그림자 효과를 추가 */}
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>투어명</TableCell>
                                <TableCell>일정</TableCell>
                                <TableCell>남은 좌석</TableCell>
                                <TableCell>가격</TableCell>
                                <TableCell>상태</TableCell>
                                <TableCell>작업</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filterToursByStatus(
                                tabValue === 0 ? 'current' : tabValue === 1 ? 'upcoming' : 'past'

                                // 각 tour 객체에 대해 새로운 <TableRow>를 생성하고, 해당 투어의 세부 정보를 표시
                            ).map((tour) => (

                                // 각 투어의 `id`를 `key`로 설정
                                <TableRow key={tour.id}>

                                    <TableCell>{tour.name}</TableCell>
                                    <TableCell>{new Date(tour.date).toLocaleString()}</TableCell>

                                    {/* tour.maxParticipants에서 tour.currentParticipants를 빼서 남은 좌석 수를 표시 */}
                                    <TableCell>{tour.maxParticipants - tour.currentParticipants}</TableCell>

                                    <TableCell>{tour.price.toLocaleString()}원</TableCell>

                                    {/* getStatusStyle(tour.status) 함수를 사용하여 상태에 따라 스타일을 동적으로 변경 */}
                                    <TableCell sx={getStatusStyle(tour.status)}>
                                        {tour.status}
                                    </TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => {
                                            setSelectedTour(tour);
                                            setTourForm(tour);
                                            setDialogType('edit');
                                            setOpenDialog(true);
                                        }}>
                                            <EditIcon />
                                        </IconButton>

                                        {/* 두 번째 IconButton은 삭제 아이콘을 클릭하면 해당 투어를 삭제하는 함수 handleDeleteTour를 실행 */}
                                        <IconButton onClick={() => handleDeleteTour(tour.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Dialog
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
                            <Grid container spacing={2}>

                                {/* 모든 화면 크기에서 이 항목이 전체 12개의 칸을 차지 */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="투어명"
                                        value={tourForm.name}

                                        // 현재 tourForm 객체의 name 속성을 value로 설정하여 표시
                                        onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="datetime-local"
                                        label="일정"
                                        value={tourForm.date}
                                        onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                                        InputLabelProps={{ shrink: true }}  // 날짜와 시간이 선택된 경우 라벨을 축소하여 표시
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        label="최대 참가 인원"
                                        value={tourForm.maxParticipants}
                                        onChange={(e) => setTourForm({ ...tourForm, maxParticipants: e.target.value })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        label="가격"
                                        value={tourForm.price}
                                        onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        multiline
                                        rows={4}
                                        label="투어 설명"
                                        value={tourForm.description}
                                        onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
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
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>

                                        {/* imagePreview 배열의 각 이미지 URL에 대해 반복문을 실행하여 이미지 미리보기를 표시 */}
                                        {/* 각 항목을 순차적으로 Card 컴포넌트로 렌더링 */}
                                        {imagePreview.map((image, index) => (
                                            <Card key={index} sx={{ width: 150 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={image}
                                                    alt={`미리보기 ${index + 1}`} // 미리보기 이미지의 순서를 나타내는 텍스트 (미리보기 1, 미리보기 2 등) 를 사용
                                                />
                                                <CardContent>
                                                    <IconButton
                                                        onClick={() => {

                                                            // imagePreview 배열에서, 클릭된 이미지의 인덱스(index)를 제외한 모든 이미지를 새로운 배열로 반환
                                                            // 클릭한 이미지의 인덱스를 제외하고 나머지 이미지만 새로운 배열로 남음
                                                            setImagePreview(prev => prev.filter((_, i) => i !== index));

                                                            // tourForm.images 배열에서, 클릭한 이미지의 인덱스(index)를 제외한 나머지 이미지를 필터링하여 새로운 배열로 반환
                                                            // 이미지 삭제 후 새로운 images 배열을 업데이트
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
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained" // contained는 배경색이 채워진 버튼을 나타냄
                                        fullWidth

                                        // 하나라도 값이 비어 있으면, 버튼이 비활성화(disabled) 상태로 변경
                                        disabled={!tourForm.name || !tourForm.date || !tourForm.maxParticipants || !tourForm.price}
                                    >
                                        {dialogType === 'add' ? '투어 추가' : '투어 수정'}
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </DialogContent>

                </Dialog>
            </Box>
        </div>
    );
};

export default AdminTourComponents;