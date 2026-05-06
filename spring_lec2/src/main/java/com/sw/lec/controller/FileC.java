package com.sw.lec.controller;

import com.sw.lec.service.FileS;
import com.sw.lec.vo.FileVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileC {

    @Autowired
    private FileS fileS;

    // 파일 업로드
    @GetMapping("/upload")
    public String upload() {
        return "file";
    }

    @PostMapping("/upload")
    public String upload(FileVO fileVO, MultipartFile f_file) {
        fileS.uploade(fileVO, f_file);
        return "file";
    }

    // 다중 파일 업로드
    @PostMapping("/upload2")
    public String upload2(MultipartFile[] files, Model model) {
        model.addAttribute("fileNames", fileS.upload2(files));
        return "file";
    }

}
