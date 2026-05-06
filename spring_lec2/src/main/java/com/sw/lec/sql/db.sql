create table product_test2
(
    p_no    number(3) primary key,
    p_name  varchar2(30 char) not null,
    p_price number(5)         not null
);
create sequence product_test2_seq;

insert into product_test2
values (product_test2_seq.nextval, 'test1', 1000);
insert into product_test2
values (product_test2_seq.nextval, 'test2', 2000);
insert into product_test2
values (product_test2_seq.nextval, 'test3', 3000);

select *
from product_test2;


create table file_test
(
    f_no    number(2) primary key,
    f_title varchar2(50 char) not null,
    f_name  varchar2(50 char) not null
);
create sequence file_test_seq;

insert into file_test
values (file_test_seq.nextval, 'test', 'a.jpg');

select *
from file_test;


create table file_test2
(
    f_details varchar2(1000 char) not null
);

select *
from file_test2;