--
-- PostgreSQL database dump
--



-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-19 18:23:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 16530)
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    phone character varying(15) NOT NULL,
    house_no character varying(100),
    street character varying(255),
    landmark character varying(255),
    city character varying(100),
    state character varying(100),
    pincode character varying(10),
    address_type character varying(20) DEFAULT 'Home'::character varying,
    is_default boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16529)
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO postgres;

--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 235
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- TOC entry 230 (class 1259 OID 16478)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16477)
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 229
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- TOC entry 226 (class 1259 OID 16436)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer,
    product_id integer,
    quantity integer DEFAULT 1
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16435)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 225
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 224 (class 1259 OID 16421)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16420)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 234 (class 1259 OID 16510)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    seller_id integer,
    product_name character varying(255),
    subtotal numeric(10,2)
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16509)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 233
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 232 (class 1259 OID 16494)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    seller_id integer NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    payment_method character varying(50),
    payment_status character varying(20) DEFAULT 'Pending'::character varying,
    order_status character varying(20) DEFAULT 'Pending'::character varying,
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(30) DEFAULT 'Pending'::character varying
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16493)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 231
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    category character varying(50) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    image character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    seller_id integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 228 (class 1259 OID 16455)
-- Name: sellers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sellers (
    id integer NOT NULL,
    shop_name character varying(150) NOT NULL,
    owner_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    phone character varying(15),
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'Pending'::character varying
);


ALTER TABLE public.sellers OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16454)
-- Name: sellers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sellers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sellers_id_seq OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 227
-- Name: sellers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sellers_id_seq OWNED BY public.sellers.id;


--
-- TOC entry 222 (class 1259 OID 16406)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16405)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4813 (class 2604 OID 16533)
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- TOC entry 4805 (class 2604 OID 16481)
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- TOC entry 4800 (class 2604 OID 16439)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4799 (class 2604 OID 16424)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 4812 (class 2604 OID 16513)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 16497)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 16393)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4802 (class 2604 OID 16458)
-- Name: sellers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers ALTER COLUMN id SET DEFAULT nextval('public.sellers_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 16409)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5013 (class 0 OID 16530)
-- Dependencies: 236
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, customer_id, full_name, phone, house_no, street, landmark, city, state, pincode, address_type, is_default, created_at) FROM stdin;
\.


--
-- TOC entry 5007 (class 0 OID 16478)
-- Dependencies: 230
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, name, email, password, created_at) FROM stdin;
1	Admin	admin@villagemart.com	$2b$10$j8ija/Hva78OamfB9uMQuuDq2hLWuBk4g.wbEjWpxtAaamMj57rbC	2026-07-17 22:42:14.730482
\.


--
-- TOC entry 5003 (class 0 OID 16436)
-- Dependencies: 226
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, quantity) FROM stdin;
\.


--
-- TOC entry 5001 (class 0 OID 16421)
-- Dependencies: 224
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id) FROM stdin;
\.


--
-- TOC entry 5011 (class 0 OID 16510)
-- Dependencies: 234
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, price, seller_id, product_name, subtotal) FROM stdin;
1	1	1	2	50.00	\N	\N	\N
2	2	7	1	30.00	\N	\N	\N
3	2	6	1	35.00	\N	\N	\N
4	2	2	1	30.00	\N	\N	\N
5	2	1	1	40.00	\N	\N	\N
6	3	9	2	42.00	\N	\N	\N
7	4	10	1	42.00	\N	\N	\N
8	4	9	1	42.00	\N	\N	\N
9	4	11	1	130.00	\N	\N	\N
10	5	11	1	130.00	\N	\N	\N
11	5	10	1	42.00	\N	\N	\N
12	6	8	1	108.00	\N	\N	\N
13	6	7	1	30.00	\N	\N	\N
14	6	11	1	130.00	\N	\N	\N
15	6	6	1	35.00	\N	\N	\N
16	18	6	1	35.00	1	Potato	35.00
17	18	11	1	130.00	4	panneer	130.00
18	19	6	1	35.00	1	Potato	35.00
19	19	11	1	130.00	4	panneer	130.00
20	20	11	2	130.00	4	panneer	260.00
21	20	10	2	42.00	4	cream	84.00
22	20	8	1	108.00	1	ghee	108.00
23	20	9	3	42.00	1	cream	126.00
\.


--
-- TOC entry 5009 (class 0 OID 16494)
-- Dependencies: 232
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, customer_id, seller_id, total_amount, payment_method, payment_status, order_status, address, created_at, status) FROM stdin;
1	1	2	300.00	COD	Pending	Pending	Bangalore	2026-07-18 11:53:38.520432	Pending
2	1	1	115.00	Google Pay	Pending	Pending	Pavithra V, 0, tekal malur , tekal, Karnataka - 563137	2026-07-18 21:09:33.276736	Pending
3	1	1	64.00	Google Pay	Pending	Pending	Home, Bangalore	2026-07-18 21:26:34.641592	Pending
4	1	4	194.00	Google Pay	Pending	Pending	Home, Bangalore	2026-07-18 22:08:53.312482	Accepted
5	1	4	152.00	Google Pay	Pending	Pending	Home, Bangalore	2026-07-18 22:42:40.827334	Delivered
6	1	1	283.00	Online	Pending	Pending	Harshitha V, 0, tekal malur , Kolar, Karnataka - 563137	2026-07-19 11:07:52.066972	Pending
7	1	4	260.00	Google Pay	Pending	Pending	Home, Bangalore	2026-07-19 14:05:06.665905	Pending
8	1	4	260.00	Google Pay	Pending	Pending	Home, Bangalore	2026-07-19 14:15:03.365572	Pending
10	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:33:08.549457	Pending
11	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:34:33.456136	Pending
12	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:37:27.885803	Pending
13	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:37:36.718782	Pending
14	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:45:11.972951	Pending
15	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:57:53.736919	Pending
16	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:57:59.915573	Pending
17	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 15:05:11.295098	Pending
18	1	1	145.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 15:08:43.378581	Pending
9	1	4	260.00	Cash on Delivery	Pending	Pending	Home, Bangalore	2026-07-19 14:32:29.96274	Accepted
19	1	1	145.00	Online	Pending	Pending	Home, Bangalore	2026-07-19 15:14:05.313099	Pending
20	1	4	528.00	Online	Pending	Pending	Home, Bangalore	2026-07-19 17:57:18.743047	Delivered
\.


--
-- TOC entry 4997 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, category, price, stock, image, created_at, seller_id) FROM stdin;
2	Potato	Fresh Potato	Vegetables	30.00	150	https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500	2026-07-17 15:47:15.793454	\N
3	Milk	Amul Milk 500ml	Milk	32.00	80	https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500	2026-07-17 15:47:15.793454	\N
4	Banana	Fresh Banana	Fruits	60.00	90	https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500	2026-07-17 15:47:15.793454	\N
5	Bread	Whole Wheat Bread	Bakery	45.00	70	https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500	2026-07-17 15:47:15.793454	\N
1	Tomato	Fresh Organic Tomato	Vegetables	40.00	100	https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500	2026-07-17 15:47:15.793454	1
6	Potato	Fresh Potato	Vegetables	35.00	50	https://images.unsplash.com/photo-1518977676601-b53f82aba655	2026-07-17 21:09:21.360622	1
7	TOMATO	IN LOW STOCK	VEGETABLES 	30.00	10		2026-07-17 22:15:10.788788	1
8	ghee	nandini parlour	grocery	108.00	10		2026-07-17 23:57:05.514188	1
9	cream	hxx	makeup	42.00	9		2026-07-18 00:02:41.383227	1
10	cream	face cream	makeup	42.00	2		2026-07-18 18:49:01.337006	4
11	panneer	milkymist	milk	130.00	6		2026-07-18 18:49:39.632154	4
12	banana	pavistore	fruits	30.00	16		2026-07-19 17:59:44.06537	4
\.


--
-- TOC entry 5005 (class 0 OID 16455)
-- Dependencies: 228
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sellers (id, shop_name, owner_name, email, password, phone, address, created_at, status) FROM stdin;
1	Fresh Mart	Rahul	rahul@gmail.com	$2b$10$cWV.nn.0F6SAiyj9QMg1NejzuTs3VNyWLE9pgYxCQAcUwzUkQlF3K	9876543210	Bangalore	2026-07-17 20:59:29.399531	Approved
2	PAVISTORe	Pavitra	pavivenkatesh19@gmail.com	$2b$10$p2VbKqp/Jotj01b5LjtiWe2ka/B85S2Htg.lvsTIeRmmy0e8ipeb2	7892243823	kghalli,tekal,malur,kolar	2026-07-18 00:09:35.83164	Approved
3	xyz	me	susheelamuniyappa64@gmail.com	$2b$10$.P3WRVCu7GJ4XL3lhGg2y.a8rDBdF6REi9xLeAKn8drxDg9ak0aYS	7892243823	kghalli,tekal,malur,kolar	2026-07-18 00:20:55.306125	Rejected
4	PAVISTORe	Pavitra	pavi@gmail.com	$2b$10$eXhNxggB6bD5hS7.tns5e.ezxPI49YkLA35ifQt65PyRqajJYo.ie	7892243823	kghalli,tekal,malur,kolar	2026-07-18 18:33:17.628616	Approved
\.


--
-- TOC entry 4999 (class 0 OID 16406)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	Pavitra	pavivenkatesh19@gmail.com	$2b$10$0uQJhmnboTqV3EancL9iluuDURYX4TD.hz01FNyvIry2k6mZvPmRa
2	Madhan	susheelamuniyappa64@gmail.com	$2b$10$2tuFx9NqHMxzxbgbNUW7EuciObyuanJt20P9bShTokaJlFU/a53Ny
3	rahul	rahul@gmail.com	$2b$10$pLx6cu6y1wZ3nCc3u3Csoe02Jd6QuXpZXTuIiZifm8KjvF1Q0mmne
\.


--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 235
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 1, false);


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 229
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 1, true);


--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 225
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 233
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 23, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 231
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 20, true);


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 12, true);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 227
-- Name: sellers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sellers_id_seq', 4, true);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 4842 (class 2606 OID 16544)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 4834 (class 2606 OID 16492)
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- TOC entry 4836 (class 2606 OID 16490)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 16443)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4824 (class 2606 OID 16427)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 16429)
-- Name: carts carts_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_key UNIQUE (user_id);


--
-- TOC entry 4840 (class 2606 OID 16518)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 16508)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 16404)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 16470)
-- Name: sellers sellers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_email_key UNIQUE (email);


--
-- TOC entry 4832 (class 2606 OID 16468)
-- Name: sellers sellers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pkey PRIMARY KEY (id);


--
-- TOC entry 4820 (class 2606 OID 16419)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4822 (class 2606 OID 16417)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4845 (class 2606 OID 16444)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- TOC entry 4846 (class 2606 OID 16449)
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4844 (class 2606 OID 16430)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4843 (class 2606 OID 16471)
-- Name: products fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.sellers(id) ON DELETE CASCADE;


--
-- TOC entry 4847 (class 2606 OID 16519)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 4848 (class 2606 OID 16524)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


-- Completed on 2026-07-19 18:23:16

--
-- PostgreSQL database dump complete
--



