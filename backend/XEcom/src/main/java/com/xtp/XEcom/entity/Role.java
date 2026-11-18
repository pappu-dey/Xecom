package com.xtp.XEcom.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "use_role")
public class Role {
    @Id 
    private UUID id = UUID.randomUUID();
    @Column (unique = true,nullable = false)
    private String name;
}
