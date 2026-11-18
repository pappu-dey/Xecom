package com.xtp.XEcom.dtos;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.xtp.XEcom.entity.Provider;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class userdto {
    

    private UUID id;


    private String email;


    private String name;
    private String mobilenumber;
    private String password;
    private String image;
    private String gender;
    private boolean enable = true;
    private Instant createat = Instant.now();
    private Instant updated = Instant.now();


   
    private Provider provider = Provider.LOCAL;
    
    private Set<Roledto> roles = new HashSet<>();

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getMobilenumber() { return mobilenumber; }
    public void setMobilenumber(String mobilenumber) { this.mobilenumber = mobilenumber; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public boolean isEnable() { return enable; }
    public void setEnable(boolean enable) { this.enable = enable; }
    public Instant getCreateat() { return createat; }
    public void setCreateat(Instant createat) { this.createat = createat; }
    public Instant getUpdated() { return updated; }
    public void setUpdated(Instant updated) { this.updated = updated; }
    public Provider getProvider() { return provider; }
    public void setProvider(Provider provider) { this.provider = provider; }
    public Set<Roledto> getRoles() { return roles; }
    public void setRoles(Set<Roledto> roles) { this.roles = roles; }
}
