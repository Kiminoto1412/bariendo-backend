-- Insert mock data for user_organization
INSERT INTO user_organization (user_id, organization_id)
VALUES
    -- Assigning patients to organizations
    (1, 1), -- John Doe belongs to Hospital A
    (2, 2), -- Alice Smith belongs to Clinic B
    (3, 3), -- Bob Johnson belongs to Health Center C
    
    -- Assigning doctors to organizations
    (4, 1), -- Emily Clark belongs to Hospital A
    (5, 2), -- Michael Wilson belongs to Clinic B
    (6, 3), -- Sarah Anderson belongs to Health Center C
    
    -- Assigning admins to organizations
    (7, 1), -- Admin One belongs to Hospital A
    (8, 2), -- Admin Two belongs to Clinic B
    (9, 3); -- Admin Three belongs to Health Center C
