package com.xtp.XEcom.services;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.xtp.XEcom.dtos.userdto;
import com.xtp.XEcom.entity.user;
import com.xtp.XEcom.repositories.userrepo;

@Service
@Transactional
public class userserviceimpl implements userservices {

    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    private final userrepo userRepository;

    public userserviceimpl(userrepo userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public userdto createUser(userdto userdto) {
        if (userdto == null || userdto.getEmail() == null || userdto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        String email = userdto.getEmail().trim();
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A user with this email already exists");
        }

        user newUser = new user();
        copyUserFields(userdto, newUser);
        newUser.setEmail(email);
        return toDto(userRepository.save(newUser));
    }
//get user email
    @Override
    @Transactional(readOnly = true)
    public userdto getUserByEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        return toDto(userRepository.findByEmail(email.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
    }

//get user by id
    @Override
    @Transactional(readOnly = true)
    public userdto getUserById(UUID id) {
        return toDto(findUser(id));
    }


    ////get all the user 
    @Override
    @Transactional(readOnly = true)
    public List<userdto> getAllUsers() {
        return userRepository.findAll()
                        .stream()
                        .map(this::toDto)
                        .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<userdto> searchUsers(String query) {
        if (query == null || query.isBlank()) {
            return getAllUsers();
        }
        String searchTerm = query.trim();
        return userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(searchTerm, searchTerm)
                .stream().map(this::toDto).toList();
    }

    @Override
    public userdto updateUser(UUID id, userdto userdto) {
        if (userdto == null) {
            throw new IllegalArgumentException("User data is required");
        }

        user existingUser = findUser(id);
        if (userdto.getEmail() != null && !userdto.getEmail().isBlank()) {
            String email = userdto.getEmail().trim();
            if (!email.equalsIgnoreCase(existingUser.getEmail()) && userRepository.existsByEmail(email)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "A user with this email already exists");
            }
            existingUser.setEmail(email);
        }

        copyUserFields(userdto, existingUser);
        return toDto(userRepository.save(existingUser));
    }

    @Override
    public void deleteUser(UUID id) {
        userRepository.delete(findUser(id));
    }

    private user findUser(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private void copyUserFields(userdto source, user target) {
        if (source.getName() != null) {
            target.setName(source.getName());
        }
        if (source.getMobilenumber() != null) {
            target.setMobilenumber(source.getMobilenumber());
        }
        if (source.getPassword() != null && !source.getPassword().isBlank()) {
            target.setPassword(passwordEncoder.encode(source.getPassword()));
        }
        if (source.getImage() != null) {
            target.setImage(source.getImage());
        }
        if (source.getGender() != null) {
            target.setGender(source.getGender());
        }
        target.setEnable(source.isEnable());
        if (source.getProvider() != null) {
            target.setProvider(source.getProvider());
        }
    }

    private userdto toDto(user source) {
        userdto result = new userdto();
        result.setId(source.getId());
        result.setEmail(source.getEmail());
        result.setName(source.getName());
        result.setMobilenumber(source.getMobilenumber());
        result.setImage(source.getImage());
        result.setGender(source.getGender());
        result.setEnable(source.isEnable());
        result.setCreateat(source.getCreateat());
        result.setUpdated(source.getUpdated());
        result.setProvider(source.getProvider());
        return result;
    }
}
