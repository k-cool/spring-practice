package com.sw.lec.service;

import com.sw.lec.mapper.FileMapper;
import com.sw.lec.vo.FileVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileS {

    @Autowired
    private FileMapper fileMapper;

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    public void uploade(FileVO fileVO, MultipartFile fFile) {
        // 확장자 추출
        String ext = fFile.getOriginalFilename().substring(fFile.getOriginalFilename().lastIndexOf("."));

        // 파일명 재생성(중복방지)
        String[] uuid = UUID.randomUUID().toString().split("-");
        String fileName = uuid[0] + ext;

        // 파일 저장
        File saveFile = new File(uploadDir + "/" + fileName);

        try {
            fFile.transferTo(saveFile);

            fileVO.setF_name(fileName);

            fileMapper.saveFile(fileVO);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }

    public String[] upload2(MultipartFile[] files) {

        String fNames = "";

        for (MultipartFile fFile : files) {

            // 확장자 추출
            String ext = fFile.getOriginalFilename().substring(fFile.getOriginalFilename().lastIndexOf("."));

            // 파일명 재생성(중복방지)
            String[] uuid = UUID.randomUUID().toString().split("-");
            String fileName = uuid[0] + ext;

            // 파일 저장
            File saveFile = new File(uploadDir + "/" + fileName);
            fNames += fileName + "!";

            try {

                fFile.transferTo(saveFile);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        fileMapper.saveFile2(fNames);

        return fNames.split("!");
    }
}
