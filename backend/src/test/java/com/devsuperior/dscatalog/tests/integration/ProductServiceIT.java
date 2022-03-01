package com.devsuperior.dscatalog.tests.integration;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@SpringBootTest
@Transactional
public class ProductServiceIT {

	@Autowired
	private ProductService service;
	
	private long existingId;
	private long nonExistingId;
	private ProductDTO dto;
	private long CountTotalProducts;
	private long CountPCGamerProducts;
	private PageRequest pageRequest;
	
	 @BeforeEach
	 void setUp() throws Exception {
		 existingId = 1L;
		 nonExistingId = 1000L;
		 dto = ProductFactory.createProductDTO();
		 CountTotalProducts = 25L;
		 CountPCGamerProducts = 21L;
		 pageRequest = PageRequest.of(0, 10);
	 }
	
	 
	 @Test
		public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {
			String name = "Camera";
			
			Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L , name);
			
			Assertions.assertTrue(result.isEmpty());
		}
	 
	 @Test
		public void findAllPagedShouldReturnProductsWhenNameExistsIgnoringCase() {
			
			String name = "pc gAMeR";
			
			Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L , name);
			
			Assertions.assertFalse(result.isEmpty());
			Assertions.assertEquals(CountPCGamerProducts, result.getTotalElements());
		}
		
		@Test
		public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {
			
			String name = "";
			
			Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L , name);
			
			Assertions.assertFalse(result.isEmpty());
			Assertions.assertEquals(CountTotalProducts, result.getTotalElements());
		}
	 
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.deleteProduct(existingId);
		});
	}
	
	@Test
	public void deleteShouldThrowExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class ,() -> {
			service.deleteProduct(nonExistingId);
		});
	
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
