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
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

const AdminTourComponents = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tours, setTours] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedTour, setSelectedTour] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [tourForm, setTourForm] = useState({
    name: '',
    date: '',
    maxParticipants: '',
    price: '',
    description: '',
    location: '',
    duration: '',
    images: [],
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setTourForm(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleTourSubmit = async (e) => {
    e.preventDefault();
    try {
      const tourDate = new Date(tourForm.date);
      const currentDate = new Date();

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
        ...tourForm,
        currentParticipants: 0,
        status,
        imageUrls: imagePreview,
      };

      if (dialogType === 'add') {
        setTours(prev => [...prev, newTour]);
        alert('투어가 추가되었습니다.');
      } else {
        setTours(prev => prev.map(tour =>
          tour.id === selectedTour.id ? newTour : tour
        ));
        alert('투어가 수정되었습니다.');
      }
      resetForm();

    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
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
    setImagePreview([]);
    setOpenDialog(false);
  };

  const handleDeleteTour = (tourId) => {
    if (window.confirm('이 투어를 삭제하시겠습니까?')) {
      setTours(prev => prev.filter(tour => tour.id !== tourId));
      alert('투어가 삭제되었습니다.');
    }
  };

  const filterToursByStatus = (status) => {
    const currentDate = new Date();
    switch (status) {
      case 'current':
        return tours.filter(tour => {
          const tourDate = new Date(tour.date);
          return tourDate.toDateString() === currentDate.toDateString();
        }).map(tour => ({
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
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setDialogType('add');
            setOpenDialog(true);
          }}
          sx={{ mb: 3 }}
        >
          새 투어 추가
        </Button>

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="현재 진행 중인 투어" />
          <Tab label="예정된 투어" />
          <Tab label="종료된 투어" />
        </Tabs>

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
              ).map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>{tour.name}</TableCell>
                  <TableCell>{new Date(tour.date).toLocaleString()}</TableCell>
                  <TableCell>{tour.maxParticipants - tour.currentParticipants}</TableCell>
                  <TableCell>{tour.price.toLocaleString()}원</TableCell>
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
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {dialogType === 'add' ? '새 투어 추가' : '투어 수정'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleTourSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="투어명"
                    value={tourForm.name}
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
                    InputLabelProps={{ shrink: true }}
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
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
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
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
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
                    variant="contained"
                    fullWidth
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