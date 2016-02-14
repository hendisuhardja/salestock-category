-- Drop table category
DROP TABLE IF EXISTS category;

-- Create table category

create table category (
  id serial primary key,
  name text not null,
  parent_id int null references category(id)
);

ALTER TABLE category
  ADD CONSTRAINT category_name_unique UNIQUE (name);


-- Drop table product
DROP TABLE IF EXISTS product;

-- Create table product
create table product (
  id serial primary key,
  name text not null,
  description text not null,
  price decimal(7,2)  not null
);

ALTER TABLE product
  ADD CONSTRAINT product_name_unique UNIQUE (name);


-- Drop table product_category
DROP TABLE IF EXISTS product_category;

-- Create table product_category
create table product_category (
  product_id int not null references product(id),
  category_id int not null references category(id),
  primary key (product_id, category_id)
);