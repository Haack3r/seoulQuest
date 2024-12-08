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
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Collapse,
} from '@mui/material';
import {
    Add as AddIcon,   // // 'Add' 아이콘을 'AddIcon'이라는 이름으로 가져옴
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
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

    const [openCapacityDialog, setOpenCapacityDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [newCapacity, setNewCapacity] = useState('');

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
                                const tourDates = tour.tdate?.map(dateStr => {
                                    try {
                                        return JSON.parse(dateStr);
                                    } catch (e) {
                                        console.error('날짜 파싱 오류:', e);
                                        return null;
                                    }
                                }).filter(date => date !== null);

                                // 시작일과 종료일 계산
                                const startDate = tourDates?.[0]?.tdate;
                                const endDate = tourDates?.[tourDates.length - 1]?.tdate;

                                console.log("투어 날짜 : ", tourDates);
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
                                            <Button
                                                onClick={() => setSelectedTno(selectedTno === tour.tno ? null : tour.tno)}
                                                sx={{
                                                    textTransform: 'none',
                                                    color: 'primary.main',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight={500}>
                                                    잔여석 보기 ({tourDates?.length}일정)
                                                </Typography>
                                                <ExpandMoreIcon
                                                    sx={{
                                                        transform: selectedTno === tour.tno ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s'
                                                    }}
                                                />
                                            </Button>
                                            <Collapse in={selectedTno === tour.tno}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px',
                                                    mt: 1,
                                                    maxHeight: '200px',
                                                    overflowY: 'auto',
                                                    '&::-webkit-scrollbar': {
                                                        width: '4px'
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                                        borderRadius: '4px'
                                                    }
                                                }}>
                                                    {tourDates?.map((dateInfo) => (
                                                        <Box key={dateInfo.tdate} sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            bgcolor: 'white',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                            borderRadius: '8px',
                                                            padding: '8px 16px',
                                                        }}>
                                                            <Typography variant="body2" sx={{ color: '#1a237e' }}>
                                                                {new Date(dateInfo.tdate).toLocaleDateString('ko-KR', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    weekday: 'short'
                                                                })}
                                                            </Typography>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px',
                                                                bgcolor: dateInfo.availableCapacity === 0 ? '#fff4f4' : '#f0f7ff',
                                                                border: `1px solid ${dateInfo.availableCapacity === 0 ? '#ffcdd2' : '#90caf9'}`,
                                                                borderRadius: '20px',
                                                                padding: '6px 12px',
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '0.9rem',
                                                                    fontWeight: 600,
                                                                    color: dateInfo.availableCapacity === 0 ? '#d32f2f' : '#1976d2',
                                                                }}>
                                                                    {dateInfo.availableCapacity} / {tour.maxCapacity}
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        ml: 1,
                                                                        color: dateInfo.availableCapacity === 0 ? '#ef5350' : '#66bb6a',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {dateInfo.availableCapacity === 0 ? '마감' : '예약가능'}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Collapse>
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

            <Dialog
                open={openCapacityDialog}
                onClose={() => setOpenCapacityDialog(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        overflow: 'hidden'
                    }
                }}
            >
                <Box sx={{
                    position: 'relative',
                    bgcolor: '#fff',
                    pb: 2
                }}>
                    <Box sx={{
                        p: 3,
                        background: 'linear-gradient(135deg, #1976d2, #64b5f6)',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <IconButton
                            onClick={() => setOpenCapacityDialog(false)}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'white'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            잔여석 수정
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {selectedDate?.tdate && new Date(selectedDate.tdate).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long'
                            })}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        <Box sx={{
                            mb: 4,
                            p: 2,
                            bgcolor: '#f8fafc',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                현재 잔여석
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                                    {selectedDate?.availableCapacity}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    / {selectedDate?.maxCapacity}
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                수정할 잔여석
                            </Typography>
                            <TextField
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={newCapacity}
                                onChange={(e) => {
                                    const value = Math.max(0, Math.min(selectedDate?.maxCapacity || 0, parseInt(e.target.value) || 0));
                                    setNewCapacity(value.toString());
                                }}
                                inputProps={{
                                    min: 0,
                                    max: selectedDate?.maxCapacity || 0,
                                    style: { fontSize: '1.2em', textAlign: 'center' }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px'
                                    }
                                }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                                최대 {selectedDate?.maxCapacity || 0}명까지 설정 가능합니다
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        px: 3,
                        mt: 2,
                        display: 'flex',
                        gap: 2
                    }}>
                        <Button
                            fullWidth
                            onClick={() => setOpenCapacityDialog(false)}
                            sx={{
                                py: 1.5,
                                borderRadius: '10px',
                                color: 'text.secondary',
                                bgcolor: '#f5f5f5',
                                '&:hover': {
                                    bgcolor: '#eeeeee'
                                }
                            }}
                        >
                            취소
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={async () => {
                                try {
                                    console.log('Update capacity:', {
                                        tno: selectedDate?.tno,
                                        date: selectedDate?.tdate,
                                        newCapacity: parseInt(newCapacity)
                                    });
                                    setOpenCapacityDialog(false);
                                    await fetchTourList();
                                } catch (error) {
                                    console.error('잔여석 수정 실패:', error);
                                    alert('잔여석 수정에 실패했습니다.');
                                }
                            }}
                            sx={{
                                py: 1.5,
                                borderRadius: '10px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                    bgcolor: 'primary.dark'
                                }
                            }}
                        >
                            저장하기
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default AdminTourComponents;