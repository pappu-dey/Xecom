package com.xtp.XEcom.services;

import java.util.List;
import java.util.UUID;

import com.xtp.XEcom.dtos.userdto;

public interface userservices {

    userdto createUser(userdto userdto);

    userdto getUserByEmail(String email);

    userdto getUserById(UUID id);

    List<userdto> getAllUsers();

    List<userdto> searchUsers(String query);

    userdto updateUser(UUID id, userdto userdto);

    void deleteUser(UUID id);

}
