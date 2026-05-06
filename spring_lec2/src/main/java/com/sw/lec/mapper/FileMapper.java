package com.sw.lec.mapper;

import com.sw.lec.vo.FileVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {

    @Insert("insert into file_test values (file_test_seq.nextval, #{f_title}, #{f_name})")
    void saveFile(FileVO fileVO);

    @Insert("insert into file_test2 values (#{fNames})")
    void saveFile2(String fNames);
}
