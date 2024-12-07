create database positivedb;
drop database positivedb;
use positivedb;

create user`positiveuser`@`%` identified by '1234'; 
grant all privileges on positivedb.* to `positiveuser`@`%`;

show tables;

drop table member_member_role_list;
drop table tbl_member;
drop table tbl_product;
drop table tbl_cart_item;
drop table tbl_category;
drop table tbl_tours;
drop table tbl_reservation_item;
drop table product_product_image_list;

select * from member_member_role_list;
select * from tbl_member;
select * from tbl_product;
select * from tbl_category;
select * from tbl_tours;
select * from tbl_tour_date;
select * from product_product_image_list;

select m.*,mrl.member_role_list as role from tbl_member m
left join member_member_role_list mrl on m.member_id = mrl.member_id
order by m.member_id;

SELECT * FROM tbl_member m
LEFT JOIN member_member_role_list mr ON m.id = mr.member_id
ORDER BY m.member_id;

SELECT *
FROM tbl_member m
LEFT JOIN member_member_role_list mr ON m.id = mr.member_id
ORDER BY CAST(m.id AS SIGNED); /* 이게 진짜 member with role list 코드 */

SELECT *
FROM tbl_tours t
LEFT JOIN tbl_tour_date td ON t.tno = td.tour_date_id
ORDER BY CAST(t.tno AS SIGNED); /* tour 코드 */

SELECT *
FROM tbl_product p
LEFT JOIN tbl_category tc ON p.pno = tc.category_id
ORDER BY CAST(p.pno AS SIGNED); /* ｐｒｏｄｕｃｔ 코드 */

SELECT 
    m.member_id,
    m.name,
    m.nick_name,
    mr.member_role_list
FROM tbl_member m
LEFT JOIN member_member_role_list mr ON m.id = mr.member_id
WHERE mr.member_role_list IN ('USER', 'ADMIN')
ORDER BY m.member_id;

SELECT 
    m.member_id,
    m.name,
    m.nick_name,
    mrl.member_role_list as role,
    CASE 
        WHEN mrl.member_role_list = 'ADMIN' THEN 'Administrator'
        WHEN mrl.member_role_list = 'USER' THEN 'Regular User'
        ELSE 'No Role'
    END as role_description
FROM tbl_member m
LEFT JOIN member_member_role_list mrl ON m.member_id = mrl.member_id
ORDER BY m.member_id;

delete from member_member_role_list
where member_id in (
select member_id
from member_member_role_list
group by member_id
having count(*) > 1
)
and member_role_list = 'USER';

delete from member_member_role_list where member_id in (8,9,10);

insert into member_member_role_list (member_id,member_role_list) values
(8,'ADMIN'),
(9,'ADMIN'),
(10,'ADMIN');