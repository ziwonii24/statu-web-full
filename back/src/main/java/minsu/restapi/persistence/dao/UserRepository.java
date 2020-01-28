package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByName(@Param("name") String name);

    boolean existsByEmail(@Param("email") String email);

    void deleteByEmail(@Param("email") String email);
}
