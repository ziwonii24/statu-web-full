package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    public boolean existsByName(String name);

    public boolean existsByEmail(String email);

    public void deleteByEmail(String email);

    public User findByEmailAndPassword(String email, String password);

}
