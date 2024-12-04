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
    Typography,
} from '@mui/material';
import {
    Add as AddIcon,   // // 'Add' 아이콘을 'AddIcon'이라는 이름으로 가져옴
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import TourForm from './ui/TourForm';
import useCustomLogin from '../../hooks/useCustomLogin';
import { addTour, adminTourList, deleteTour, getTour, modifyTour } from '../../api/AdminApi';
import { Search } from 'lucide-react';

const host = `http://localhost:8080/api`;

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
    const [openDialog, setOpenDialog] = useState(false);  // 대화상자 (모달창)가 열려있는지 여부를 저장하는 상태
    const [dialogType, setDialogType] = useState('');

    const [showTourDetail, setShowTourDetail] = useState(false);

    const [selectedTno, setSelectedTno] = useState(null)
    const [selectedTour, setSelectedTour] = useState(null);  // 이미지 미리보기 URL 목록을 저장하는 상태

    // const [imagePreview, setImagePreview] = useState([]);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(9);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("t");

    const { exceptionHandle } = useCustomLogin();

    const fetchTourList = () => {
        console.log("투어 목록 요청:", {
            페이지: page,
            사이즈: size,
            검색어: keyword,
            타입: type,
        });

        adminTourList({ page, size, keyword, type })
            .then((data) => {
                setServerData(data);
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
            alert(error.message || "투어 등록에 실패했습니다.");
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

    const handleGetTour = (tno) => {
        getTour(tno)
            .then((data) => {
                setSelectedTour(data);
                setShowTourDetail(true);
            })
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
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',  // 가운데 정렬
                width: '100%',
                marginTop: '2rem',
                marginBottom: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    width: '50%',          // 검색창 너비
                    gap: '1rem'            // 검색창과 버튼 사이 간격
                }}>
                    <input
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        placeholder="투어 이름 또는 카테고리 검색"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={fetchTourList}
                        style={{ minWidth: '100px' }}
                    >
                        <Search size={16} style={{ marginRight: '0.5rem' }} />
                        검색
                    </Button>
                </div>
            </div>

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
                                <TableCell>위치</TableCell>
                                <TableCell>관리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serverData.dtoList?.map((tour) => {
                                // tourDate JSON 파싱
                                const tourDates = tour.tourDate?.map(dateStr => {
                                    try {
                                        return JSON.parse(dateStr);
                                    } catch (e) {
                                        console.error('날짜 파싱 오류:', e);
                                        return null;
                                    }
                                }).filter(date => date !== null);

                                // 시작일과 종료일 계산
                                const startDate = tourDates?.[0]?.tourDate;
                                const endDate = tourDates?.[tourDates.length - 1]?.tourDate;

                                return (
                                    <TableRow key={tour.tno}>
                                        <TableCell>{tour.tname}</TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '8px'
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    '& .date-label': {
                                                        minWidth: '60px',
                                                        color: 'primary.main',
                                                        fontWeight: 'bold'
                                                    }
                                                }}>
                                                    <span className="date-label">시작일:</span>
                                                    <Box sx={{
                                                        ml: 1,
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                    }}>
                                                        {startDate || '날짜 없음'}
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    '& .date-label': {
                                                        minWidth: '60px',
                                                        color: 'error.main',
                                                        fontWeight: 'bold'
                                                    }
                                                }}>
                                                    <span className="date-label">종료일:</span>
                                                    <Box sx={{
                                                        ml: 1,
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                    }}>
                                                        {endDate || '날짜 없음'}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    bgcolor: 'background.paper',
                                                    border: 1,
                                                    borderColor: 'primary.main',
                                                    borderRadius: '8px',
                                                    padding: '4px 12px'
                                                }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        잔여/전체
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight="bold" color="primary.main">
                                                        {tourDates[0].availableCapacity}/{tour.maxCapacity}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" fontWeight="medium">
                                                {tour.tprice?.toLocaleString()}
                                                <Typography component="span" color="text.secondary" ml={0.5}>
                                                    원
                                                </Typography>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{tour.taddress}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => handleEdit(tour.tno)}
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(tour.tno)}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(serverData.prev ? page - 1 : page)}
                        disabled={!serverData.prev}
                    >
                        이전
                    </Button>
                    {serverData.pageNumList?.map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={page === pageNum ? "contained" : "outlined"}
                            onClick={() => handlePageChange(pageNum)}
                        >
                            {pageNum}
                        </Button>
                    ))}
                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(serverData.next ? page + 1 : page)}
                        disabled={!serverData.next}
                    >
                        다음
                    </Button>
                </div>

                {openDialog && (
                    <TourForm
                        isEditing={isEditing}
                        initialData={isEditing ? selectedTour : serverData}
                        onSubmit={handleFormSubmit}
                        onClose={handleClose}
                    />
                )}
            </Box>
        </>
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