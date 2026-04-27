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