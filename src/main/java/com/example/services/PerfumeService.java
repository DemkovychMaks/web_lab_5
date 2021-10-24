package com.example.services;
import com.example.models.Perfume;
import com.example.repos.PerfumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PerfumeService {


    @Autowired
    private PerfumeRepository repo;

    public List<Perfume> listAll() {
        return repo.findAll();
    }

    public void save(Perfume perfume) {
        repo.save(perfume);
    }

    public Optional<Perfume> get(int id) {
        return repo.findById(id);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }
}
