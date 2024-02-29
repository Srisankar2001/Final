package com.project.shop.service;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.ProductDTO;
import com.project.shop.entity.Product;
import com.project.shop.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    public APIResponse createProduct(ProductDTO productDTO) {
        APIResponse apiResponse=new APIResponse();

        Product product=new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setBrand_id(productDTO.getBrand_id());
        product.setPrice(productDTO.getPrice());
        product.setLocation(productDTO.getLocation());

        productRepository.save(product);
        apiResponse.setData(product);
        return apiResponse;

    }

    public APIResponse getProducts() {
        APIResponse apiResponse=new APIResponse();
        List<Product> productList=new ArrayList<>();
        productRepository.findAll().forEach(product -> productList.add(product));

        apiResponse.setData(productList);
        return apiResponse;
    }

    public APIResponse deleteByProductId(Long productid) {
        APIResponse apiResponse=new APIResponse();
        productRepository.deleteById(productid);
        apiResponse.setData("product deleted successfully");
        return apiResponse;
    }

    public APIResponse updateProduct(Product incomingProduct) {
        APIResponse apiResponse=new APIResponse();
        productRepository.save(incomingProduct);
        apiResponse.setData(incomingProduct);
        return apiResponse;
    }


    public APIResponse getProduct(Long id) {
        APIResponse apiResponse=new APIResponse();
        apiResponse.setData(productRepository.findById(id));
        return apiResponse;
    }
}

