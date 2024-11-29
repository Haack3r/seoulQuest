import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, List, ListItem, ListItemText,
    Container, Grid, Card, CardContent, Avatar,
    Chip, Badge, Tooltip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { getList, updateReply, saveTempReply } from '../../api/AdminApi';

// 문의 목록 스타일
const getListItemStyle = (isSelected) => ({
    marginBottom: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#e3f2fd' : 'white',
    border: '1px solid #e0e0e0',
    '&:hover': {
        bgcolor: '#f5f5f5',
        transform: 'translateY(-2px)',
    }
});

// StatusChip 컴포넌트 수정 (처리 상태)
const StatusChip = ({ status }) => {
    const getChipColor = (status) => {
        switch (status) {
            case '처리완료':
                return 'success';
            case '처리중':
                return 'warning';
            case '미처리':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Chip
            label={status}
            size="small"
            color={getChipColor(status)}
            variant="outlined"
        />
    );
};

const ContactListItem = ({ contact, isSelected, onClick }) => (

    // 현재 항목이 선택되었는지 여부에 따라 동적으로 스타일 적용, 사용자가 항목을 클릭하면 onClick 함수가 실행
    <ListItem style={getListItemStyle(isSelected)} onClick={onClick}>
        
        <ListItemText
            primary={
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Avatar style={{ backgroundColor: '#1976d2' }}>
                        
                        {/* 문의자의 이름에서 첫 글자를 표시 */}
                        {contact.name.charAt(0)}    

                    </Avatar>

                    <div style={{ flex: 1 }}>
                        <Typography style={{ fontWeight: 'bold' }}>
                            {contact.name}
                        </Typography>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <EmailIcon style={{ fontSize: 'small', color: 'rgba(0, 0, 0, 0.54)' }} />
                            <Typography style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                {contact.email}
                            </Typography>
                        </div>

                    </div>

                    {/* <Tooltip> 컴포넌트: 마우스를 올리면 툴팁(설명 박스) */}
                    <Tooltip title="문의 날짜">
                        <Typography style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>
                            {new Date(contact.createdAt).toLocaleDateString()}
                        </Typography>
                    </Tooltip>
                </div>
            }
            secondary={
                <div style={{ marginTop: '8px' }}>

                    <Typography style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',   // 텍스트가 숨겨질 경우, 말 줄임표(...)로 표시
                        whiteSpace: 'nowrap',
                        fontSize: '14px'
                    }}>
                        {contact.inquiry}
                    </Typography>

                    <div style={{ marginTop: '10px' }}>
                        <StatusChip status={contact.status} />
                    </div>

                </div>
            }
        />
    </ListItem>
);

// 문의 상세 정보 섹션
const ContactDetail = ({ contact, replyText, setReplyText, onSaveTemp, onComplete }) => (
    <Card>
        <CardContent>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',    // 좌우 공간을 최대한 활용하여 배치
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #e0e0e0'
            }}>
                
                {/* 문의 상세 내용 첫 번째 섹션 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Avatar style={{ backgroundColor: '#1976d2' }}>{contact.name.charAt(0)}</Avatar>
                    <div>
                        <Typography variant="h6">{contact.name}</Typography>
                        <Typography style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{contact.email}</Typography>
                    </div>
                </div>

                <Chip
                    icon={<AccessTimeIcon />}
                    label={new Date(contact.createdAt).toLocaleString()}
                    variant="outlined"  // 테두리 있는 스타일
                    size="small"
                />
            </div>

            {/* 문의 내용 표시 영역 */}
            <div style={{ marginBottom: '32px' }}>
                <Typography style={{ marginBottom: '8px', fontWeight: 'bold' }}>문의 내용</Typography>
                <Paper style={{ padding: '16px', backgroundColor: '#f5f5f5' }} variant="outlined">
                    <Typography>{contact.inquiry}</Typography>
                </Paper>
            </div>

            {/* 처리 상태 표시 영역 */}
            <div style={{ marginBottom: '24px' }}>
                <Typography style={{ marginBottom: '8px', fontWeight: 'bold' }}>처리 상태</Typography>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <StatusChip status={contact.status} />
                    <Typography style={{ color: 'rgba(0, 0, 0, 0.6)' }}>

                        {/* 문의 접수일시 표시 */}
                        접수일시: {new Date(contact.createdAt).toLocaleString()}
                    </Typography>
                </div>
            </div>

            <div>
                <Typography style={{ marginBottom: '16px', fontWeight: 'bold' }}>답변 내용</Typography>
                <Paper style={{ padding: '16px' }} variant="outlined">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="답변을 입력해주세요."
                            style={{
                                width: '100%',
                                minHeight: '130px',
                                padding: '8px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <Chip
                                label="임시저장"
                                variant="outlined"
                                style={{ cursor: 'pointer' }}
                                onClick={onSaveTemp}
                            />
                            <Chip
                                label="답변완료"
                                color="primary"
                                style={{ cursor: 'pointer' }}
                                onClick={onComplete}
                            />
                        </div>
                    </div>
                </Paper>
            </div>
        </CardContent>
    </Card>
);

const AdminCustomerContactComponent = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const data = await getList();
            setContacts(data);
        } catch (error) {
            console.error("문의 목록 로딩 실패:", error);
            alert("문의 목록을 불러오는데 실패했습니다.");
        }
    };

    const handleSaveTemp = async () => {
        if (!selectedContact || !replyText.trim()) {
            alert('답변 내용을 입력해주세요.');
            return;
        }

        try {
            console.log('Saving temp reply:', replyText); // 디버깅
            const response = await saveTempReply(selectedContact.id, replyText.trim());
            console.log('Save temp response:', response); // 디버깅

            if (response) {
                // 상태를 '처리중'으로 업데이트
                const updatedContact = {
                    ...response,
                    status: '처리중'
                };

                setSelectedContact(updatedContact);
                setContacts(prevContacts => prevContacts.map(contact =>
                    contact.id === selectedContact.id ? updatedContact : contact
                ));
                alert('임시저장되었습니다.');
            }
        } catch (error) {
            console.error("임시저장 실패:", error);
            alert("임시저장에 실패했습니다.");
        }
    };

    const handleComplete = async () => {
        if (!selectedContact || !replyText.trim()) {
            alert('답변 내용을 입력해주세요.');
            return;
        }

        try {
            const response = await updateReply(selectedContact.id, replyText.trim());
            console.log('Update reply response:', response); // 디버깅

            if (response) {
                const updatedContact = {
                    ...response,
                    reply: replyText,
                    status: '처리완료',
                    tempReply: ''
                };

                setSelectedContact(updatedContact);
                setContacts(prevContacts => prevContacts.map(contact =>
                    contact.id === selectedContact.id ? updatedContact : contact
                ));
                alert('답변이 등록되었습니다.');
            }
        } catch (error) {
            console.error("답변 등록 실패:", error);
            alert("답변 등록에 실패했습니다.");
        }
    };

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        setReplyText(contact.tempReply || contact.reply || '');
    };

    return (
        <Container maxWidth="xl" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>고객 문의 관리</Typography>
                <Badge badgeContent={contacts.filter(c => c.status === '미처리').length} color="primary">
                    <Chip label="전체 문의" color="primary" variant="outlined" />
                </Badge>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Paper style={{ padding: '16px', height: '80vh', overflow: 'auto' }}>
                        <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                            문의 목록
                        </Typography>
                        <List>
                            {contacts.map((contact) => (
                                <ContactListItem
                                    key={contact.id}
                                    contact={contact}
                                    isSelected={selectedContact?.id === contact.id}
                                    onClick={() => handleContactSelect(contact)}
                                />
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Paper style={{ padding: '24px', height: '80vh', overflow: 'auto' }}>
                        <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                            문의 상세 내용
                        </Typography>
                        {selectedContact ? (
                            <ContactDetail
                                contact={selectedContact}
                                replyText={replyText}
                                setReplyText={setReplyText}
                                onSaveTemp={handleSaveTemp}
                                onComplete={handleComplete}
                            />
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 'calc(100% - 60px)',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px'
                            }}>
                                <PersonIcon style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.54)', marginBottom: '8px' }} />
                                <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }}>문의를 선택해주세요</Typography>
                            </div>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminCustomerContactComponent;