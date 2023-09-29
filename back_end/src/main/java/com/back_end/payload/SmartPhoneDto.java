package com.back_end.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SmartPhoneDto {
    private String brand;
    private String technology;
    private Integer price;
    private String internalMemory;
    private String ram;
    private String screenDimension;
    private String imageCode;
}
