package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		 Optional<Category> obj = repository.findById(id);
		 Category category = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		 return new CategoryDTO(category);
	}
	
	@Transactional
	public CategoryDTO saveCategory(CategoryDTO dto) {
		Category category = new Category(null , dto.getName());
		category = repository.save(category);
		return new CategoryDTO(category);
	}
	
	@Transactional
	public CategoryDTO updateCategory(Long id , CategoryDTO dto) {
		findById(id);
		Category category = new Category(id , dto.getName());
		category = repository.save(category);
		return new CategoryDTO(category);
	}

	public void deleteCategory(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}
	}
}
