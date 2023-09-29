package com.back_end.specification;

import com.back_end.entity.SmartPhone;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SmartPhoneSpecification {
    public Specification<SmartPhone> hasBrand(List<String> brand) {
        return (root, query, criteriaBuilder) -> root.get("brand").in(brand);
    }

    public Specification<SmartPhone> hasTechnology(List<String> technology) {
        return (root, query, criteriaBuilder) -> root.get("technology").in(technology);
    }

    public Specification<SmartPhone> hasRam(List<String> ram) {
        return (root, query, criteriaBuilder) -> root.get("ram").in(ram);
    }

    public Specification<SmartPhone> hasInternalMemory(List<String> internalMemory) {
        return (root, query, criteriaBuilder) -> root.get("internalMemory").in(internalMemory);
    }

    public Specification<SmartPhone> hasScreenDimension(List<String> screenDimension) {
        return (root, query, criteriaBuilder) -> root.get("screenDimension").in(screenDimension);
    }

    public Specification<SmartPhone> hasPrice(Integer min, Integer max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), min, max);
    }


}
