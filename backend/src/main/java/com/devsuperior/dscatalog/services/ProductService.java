package com.devsuperior.dscatalog.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = repository.findAll(pageRequest);
		return list.map(x -> new ProductDTO(x));
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		 Optional<Product> obj = repository.findById(id);
		 Product product = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		 return new ProductDTO(product, product.getCategories());
	}
	
	@Transactional
	public ProductDTO saveProduct(ProductDTO dto) {
		//Product category = new Product(null , dto.getName());
		Product product = new Product();
		product = repository.save(product);
		return new ProductDTO(product);
	}
	
	@Transactional
	public ProductDTO updateProduct(Long id , ProductDTO dto) {
		findById(id);
		//Product category = new Product(id , dto.getName());
		Product product = new Product();
		product = repository.save(product);
		return new ProductDTO(product);
	}

	public void deleteProduct(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}
	}
}
