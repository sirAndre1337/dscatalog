package com.devsuperior.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Product product;
	private PageImpl<Product> page;
	private ProductDTO dto;
	
	 @BeforeEach
	 void setUp() throws Exception {
		 existingId = 1L;
		 nonExistingId = 1000L;
		 dependentId = 4L;
		 product = ProductFactory.createProduct();
		 page = new PageImpl<>(List.of(product));
		 dto = ProductFactory.createProductDTO();
		 
		 Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.anyString()))
		 	.thenReturn(page);
		 
		 Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		 
		 Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		 Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		 
		 Mockito.doNothing().when(repository).deleteById(existingId);
		 Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		 Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
		 
		 
	 }
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.deleteProduct(existingId);
		});
	
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}
	
	@Test
	public void deleteShouldThrowExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class ,() -> {
			service.deleteProduct(nonExistingId);
		});
	
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldThrowExceptionWhenIdDepend() {
		
		Assertions.assertThrows(DataBaseException.class ,() -> {
			service.deleteProduct(dependentId);
		});
	
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void fidAllPagedShouldReturnPage() {
		long categoryId = 0L;
		String name = "";
		PageRequest pageRequest = PageRequest.of(0, 10);
		
		Page<ProductDTO> result = service.findAllPaged(pageRequest, categoryId, name);
		
		Assertions.assertNotNull(result);
		Assertions.assertFalse(result.isEmpty());
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		Assertions.assertInstanceOf(ProductDTO.class, service.findById(existingId));
	}
	
	@Test
	public void findByIdShouldThrowExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
	}
	
	@Test
	public void updatedShouldReturnProductDTOWhenIdExists() {
		Assertions.assertInstanceOf(ProductDTO.class, service.updateProduct(existingId , dto));
	}
	
	@Test
	public void updateShouldThrowExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
	}
	
	@Test
	public void savedShouldReturnProductDTO() {
		Assertions.assertInstanceOf(ProductDTO.class, service.saveProduct(dto));
	}
}
