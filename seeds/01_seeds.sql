INSERT INTO users (name, email, password)
VALUES ('Pat', 'pohara@gamil.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('dill', 'dill@gamil.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('bil', 'bill@gamil.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'place1', 'log cabin in bush', 'https://img.com/img1', 'https://otherimg/img1', 300, 2, 2, 3, 'canada', 'street1', 'owen sound', 'ontario', 'l7p1e5', TRUE),
(2, 'place2', 'apt', 'https://img.com/img2', 'https://otherimg/img2', 250, 2, 2, 3, 'canada', 'street2', 'barrie', 'ontario', 'l7p1f5', TRUE),
(3, 'place3', 'cottage', 'https://img.com/img3', 'https://otherimg/img3', 275, 2, 2, 3, 'canada', 'street3', 'thunder bay', 'ontario', 'l7p1g5', FALSE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 4, 'pretty good'),
(2, 2, 2, 3, 'na'),
(3, 3, 3, 3.5, 'ok');