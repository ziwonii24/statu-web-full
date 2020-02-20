package minsu.restapi.persistence.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST", "일반 사용자"),
    MANAGER("ROLE_MANAGER", "관리자");

    private final String key;
    private final String title;
}
