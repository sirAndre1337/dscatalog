package com.devsuperior.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long CountTotalProducts;
	private long CountPCGamerProducts;
	private Pageable pageable;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		CountTotalProducts = 25L;
		CountPCGamerProducts = 21L;
		pageable = PageRequest.of(0, 10);
	}
	
	@Test
	public void deleteShouldDelteObjectWhenIdExists() {
		repository.deleteById(existingId);
		
		Optional<Product> result = repository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}
	
	@Test
	public void saveShouldPersistWithAutoIncrementWhenIdIsNull() {
		Product p = ProductFactory.createProduct();
		p.setId(null);
		p = repository.save(p);
		
		Optional<Product> result = repository.findById(p.getId());
		
		Assertions.assertNotNull(p.getId());
		Assertions.assertEquals(CountTotalProducts + 1, p.getId());
		
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(p, result.get());
	}
	
	@Test
	public void findShouldReturnNothingWhenNameDoesNotExist() {
		String name = "Camera";
		
		Page<Product> result = repository.find(null, pageable, name);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		
		String name = "PC Gamer";
		
		Page<Product> result = repository.find(null, pageable, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(CountPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc gAMeR";
		
		Page<Product> result = repository.find(null, pageable, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(CountPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		
		String name = "";
		
		Page<Product> result = repository.find(null, pageable, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(CountTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenCategoryIsNull() {
		String name = "";
		
		Page<Product> result = repository.find(null, pageable, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(CountTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsByIdWhenCategoryIdExists() {
		String name = "";
		
		List<Category> lista = new ArrayList<>();
		lista.add(new Category(3L, ""));
		
		
		Page<Product> result = repository.find(lista, pageable, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(23, result.getTotalElements());
	}

}
