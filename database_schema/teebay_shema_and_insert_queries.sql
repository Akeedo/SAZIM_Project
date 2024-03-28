-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE IF NOT EXISTS public.products (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	price numeric(10, 2) NOT NULL,
	category varchar(100) NOT NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users (
	id serial4 NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	address text NULL,
	phone_number varchar(20) NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions (
	id serial4 NOT NULL,
	product_id int4 NOT NULL,
	user_id int4 NOT NULL,
	transaction_type text NOT NULL,
	"date" timestamp(3) NOT NULL,
	amount float8 NOT NULL,
	CONSTRAINT transactions_pkey PRIMARY KEY (id)
);


-- public.transactions foreign keys

ALTER TABLE public.transactions ADD CONSTRAINT transactions_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- public.rentals definition

-- Drop table

-- DROP TABLE public.rentals;

CREATE TABLE IF NOT EXISTS public.rentals (
	id serial4 NOT NULL,
	transaction_id int4 NOT NULL,
	rent_from timestamp(3) NOT NULL,
	rent_to timestamp(3) NOT NULL,
	CONSTRAINT rentals_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX rentals_transaction_id_key ON public.rentals USING btree (transaction_id);


-- public.rentals foreign keys

ALTER TABLE public.rentals ADD CONSTRAINT rentals_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO public.products (title,description,price,category) VALUES
	 ('Remote Control Drone','4K camera drone with GPS and 30-minute flight time.',349.99,'toys'),
	 ('Ergonomic Office Chair','Adjustable office chair with lumbar support and breathable mesh.',199.99,'furniture'),
	 ('Bluetooth Noise-Canceling Headphones','High-quality sound with active noise cancellation and long battery life.',249.99,'electronics'),
	 ('Smart Robotic Vacuum Cleaner','Wi-Fi connected robotic vacuum cleaner with mapping technology.',499.99,'home_appliances'),
	 ('Portable Basketball Hoop','Adjustable height basketball hoop with weather-resistant material.',189.99,'sporting_goods'),
	 ('Electric Skateboard','High-speed electric skateboard with a durable maple deck and remote control.',399.99,'sporting_goods'),
	 ('Smart Thermostat','Energy-saving smart thermostat with remote control via mobile app.',249.99,'home_appliances'),
	 ('Gaming Laptop','High-performance gaming laptop with RTX graphics and 144Hz display.',1499.99,'electronics'),
	 ('Mountain Bike','Durable mountain bike with hydraulic disc brakes and suspension fork.',580.00,'sporting_goods'),
	 ('Mountain Bike 3','Durable mountain bike with hydraulic disc brakes and suspension fork.',580.00,'sporting_goods');


INSERT INTO public.users (first_name,last_name,address,phone_number,email,"password") VALUES
	 ('John','Doe','1234 Maple Street','555-1234','john.doe@example.com','password1'),
	 ('Jane','Doe','2345 Oak Street','555-2345','jane.doe@example.com','password2'),
	 ('Jim','Beam','3456 Pine Street','555-3456','jim.beam@example.com','password3'),
	 ('Jack','Daniels','4567 Birch Street','555-4567','jack.daniels@example.com','password4'),
	 ('Josie','Wales','5678 Cedar Street','555-5678','josie.wales@example.com','password5'),
	 ('Frank','Miller','505 Cherry Street','555-9900','frank.miller@example.com','$2b$10$gvfe10smplU03SUhzy1fsOAQWtDlvq.9pe6zo4NhKz66TUqOM1qv2'),
	 ('Henry','Moore','707 Maple Street','555-1415','henry.moore@example.com','$2b$10$IVMdIBVjQuUlwfQxwcEaN.KxXaPCHuEFh.xeBjVW.PCZmAcNQ31va'),
	 ('Soue','Moode','707 Maple Street','555-1415','soue.moode@example.com','$2b$10$G.HnRpPY0MNN8oVEdi0rDeClkofAwqAxQl02YT7T3y6mmgWSBHfZG'),
	 ('Akeed','Anjum','Mohammadiya Housing Limited, Road No:8, House No:130, Mohammadpur, Dhaka','01770590261','akeed@example.com','$2b$10$vJt5bh0gOEZenPDnkjzChOLZRbfc1ON4HiKtgDTDTZT3csVQoqIw6'),
	 ('Eve','Davis','404 Spruce Street','555-7788','eve.davis@example.com','$2b$10$xMMqQ6NGPhoX72z8ZJ1Dl.xwrs4O27Pr1g8iC7ki6Agbgt4oqjVx6');
INSERT INTO public.users (first_name,last_name,address,phone_number,email,"password") VALUES
	 ('Grace','Wilson','606 Elm Street','555-1213','grace.wilson@example.com','$2b$10$/i1rMXTuE4jbBaJvY5EDVucLpPKKZ/ZGdEJnhWHgGvUchiAgQszE6');
	 
INSERT INTO public.transactions (product_id,user_id,transaction_type,"date",amount) VALUES
	 (8,2,'rent','2024-03-24 06:52:49.281',500.0),
	 (6,6,'rent','2024-03-26 10:32:36.783',349.99),
	 (8,6,'rent','2024-03-26 10:42:42.298',249.99),
	 (10,6,'buy','2024-03-26 13:09:08.943',189.99),
	 (17,6,'buy','2024-03-27 17:52:58.095',580.0),
	 (17,6,'buy','2024-03-27 17:58:15.079',580.0),
	 (17,6,'buy','2024-03-27 18:01:10.091',580.0);



INSERT INTO public.rentals (transaction_id,rent_from,rent_to) VALUES
	 (23,'2024-05-18 00:00:00','2024-06-15 00:00:00'),
	 (24,'2024-03-26 00:00:00','2024-03-30 00:00:00'),
	 (25,'2024-03-26 00:00:00','2024-03-30 00:00:00');
