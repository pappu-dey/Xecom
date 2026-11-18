package com.xtp.XEcom.entity;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.xtp.XEcom.entity.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;


@Entity 
@Table(name="user")
public class user {


    @Id
    @GeneratedValue(strategy =GenerationType.UUID)
    @Column (name = "user_id")
    private UUID id;


@Column (name = "email",unique =true)
    private String email;


    private String name;
    private String mobilenumber;
    private String password;
    private String image;
    private String gender;
    private boolean enable = true;
    private Instant createat = Instant.now();
    private Instant updated = Instant.now();


    @Enumerated(EnumType.STRING)
    private Provider provider = Provider.LOCAL;
    @ManyToMany (fetch = FetchType.EAGER)
    @JoinTable (name = "user_roles",
        joinColumns = @JoinColumn(name="user_id"),
        inverseJoinColumns = @JoinColumn(name="role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @PrePersist 
    protected  void  onCreate(){
Instant now=Instant.now();
if(createat==null)createat=now;
  updated=now;
    }
    @PreUpdate 
    protected  void onUpdate(){
        updated=Instant.now();
    }

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
    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}
