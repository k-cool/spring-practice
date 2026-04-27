create table menu_test
(
    m_no    number(3) primary key,
    m_name  varchar2(20 char) not null,
    m_price number(6)         not null
);


create sequence menu_test_seq;

insert into menu_test
values (menu_test_seq.nextval, 'test', 10000);
insert into menu_test
values (menu_test_seq.nextval, 'test2', 20000);
insert into menu_test
values (menu_test_seq.nextval, 'test3', 30000);

select *
from menu_test;