package com.example.controllers;
import java.util.Optional;

import com.example.models.Perfume;
import com.example.services.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;


@RestController
@RequestMapping("/web_lab_3")
public class PerfumeController {

    @Autowired
    private PerfumeService service;

    @GetMapping
    public ResponseEntity<?> list() {
        if (service.listAll().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(service.listAll(), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        Optional<Perfume> perfumeOptional = service.get(id);
        if (perfumeOptional.isPresent()) {
            return new ResponseEntity<>(perfumeOptional, HttpStatus.OK);
        } else  {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestBody Perfume perfume) {
        service.save(perfume);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Perfume perfume, @PathVariable int id) {
        Optional<Perfume> perfumeOptional = service.get(id);
        if (perfumeOptional.isPresent()) {
            perfume.setId(id);
            service.save(perfume);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        Optional<Perfume> armamentOptional = service.get(id);
        if(armamentOptional.isPresent()) {
            service.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
