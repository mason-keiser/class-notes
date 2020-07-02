--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."tagTable" DROP CONSTRAINT unique_tag_name;
ALTER TABLE ONLY public."tagRelations" DROP CONSTRAINT unique_entries;
ALTER TABLE ONLY public."tagTable" DROP CONSTRAINT "tagTable_pkey";
ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
ALTER TABLE ONLY public.notebooks DROP CONSTRAINT notebooks_pkey;
ALTER TABLE ONLY public."fcItem" DROP CONSTRAINT "fcItem_pkey";
ALTER TABLE ONLY public."fcDeck" DROP CONSTRAINT "fcDeck_pkey";
ALTER TABLE public."tagTable" ALTER COLUMN "tagId" DROP DEFAULT;
ALTER TABLE public.students ALTER COLUMN "studentId" DROP DEFAULT;
ALTER TABLE public.notes ALTER COLUMN "noteId" DROP DEFAULT;
ALTER TABLE public.notebooks ALTER COLUMN "notebookId" DROP DEFAULT;
ALTER TABLE public."fcItem" ALTER COLUMN "fcId" DROP DEFAULT;
ALTER TABLE public."fcDeck" ALTER COLUMN "fcDeckId" DROP DEFAULT;
DROP SEQUENCE public."tagTable_tagId_seq";
DROP TABLE public."tagTable";
DROP TABLE public."tagRelations";
DROP SEQUENCE public."students_studentId_seq";
DROP TABLE public.students;
DROP SEQUENCE public."notes_noteId_seq";
DROP TABLE public.notes;
DROP SEQUENCE public."notebooks_notebookId_seq";
DROP TABLE public.notebooks;
DROP SEQUENCE public."fcItem_fcId_seq";
DROP TABLE public."fcItem";
DROP SEQUENCE public."fcDeck_fcDeckId_seq";
DROP TABLE public."fcDeck";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fcDeck; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."fcDeck" (
    "fcDeckId" integer NOT NULL,
    "notebookId" integer NOT NULL
);


--
-- Name: fcDeck_fcDeckId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."fcDeck_fcDeckId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fcDeck_fcDeckId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."fcDeck_fcDeckId_seq" OWNED BY public."fcDeck"."fcDeckId";


--
-- Name: fcItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."fcItem" (
    "fcId" integer NOT NULL,
    "fcQuestion" text NOT NULL,
    "fcAnswer" text NOT NULL,
    "fcDeckId" integer NOT NULL
);


--
-- Name: fcItem_fcId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."fcItem_fcId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fcItem_fcId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."fcItem_fcId_seq" OWNED BY public."fcItem"."fcId";


--
-- Name: notebooks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notebooks (
    "notebookId" integer NOT NULL,
    "studentId" integer NOT NULL,
    "notebookName" text NOT NULL
);


--
-- Name: notebooks_notebookId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."notebooks_notebookId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notebooks_notebookId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."notebooks_notebookId_seq" OWNED BY public.notebooks."notebookId";


--
-- Name: notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notes (
    "noteId" integer NOT NULL,
    "notebookId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    "noteTitle" text NOT NULL,
    "noteContent" text NOT NULL,
    "noteDifficulty" integer NOT NULL,
    "noteResource" jsonb NOT NULL,
    "noteCode" jsonb NOT NULL
);


--
-- Name: notes_noteId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."notes_noteId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notes_noteId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."notes_noteId_seq" OWNED BY public.notes."noteId";


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    "studentId" integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: students_studentId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."students_studentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_studentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."students_studentId_seq" OWNED BY public.students."studentId";


--
-- Name: tagRelations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tagRelations" (
    "itemId" integer NOT NULL,
    type text NOT NULL,
    "tagId" integer NOT NULL
);


--
-- Name: tagTable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tagTable" (
    "tagId" integer NOT NULL,
    "tagName" text NOT NULL,
    "updatedAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: tagTable_tagId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."tagTable_tagId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tagTable_tagId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."tagTable_tagId_seq" OWNED BY public."tagTable"."tagId";


--
-- Name: fcDeck fcDeckId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."fcDeck" ALTER COLUMN "fcDeckId" SET DEFAULT nextval('public."fcDeck_fcDeckId_seq"'::regclass);


--
-- Name: fcItem fcId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."fcItem" ALTER COLUMN "fcId" SET DEFAULT nextval('public."fcItem_fcId_seq"'::regclass);


--
-- Name: notebooks notebookId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notebooks ALTER COLUMN "notebookId" SET DEFAULT nextval('public."notebooks_notebookId_seq"'::regclass);


--
-- Name: notes noteId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes ALTER COLUMN "noteId" SET DEFAULT nextval('public."notes_noteId_seq"'::regclass);


--
-- Name: students studentId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN "studentId" SET DEFAULT nextval('public."students_studentId_seq"'::regclass);


--
-- Name: tagTable tagId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tagTable" ALTER COLUMN "tagId" SET DEFAULT nextval('public."tagTable_tagId_seq"'::regclass);


--
-- Data for Name: fcDeck; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."fcDeck" ("fcDeckId", "notebookId") FROM stdin;
1	1
\.


--
-- Data for Name: fcItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."fcItem" ("fcId", "fcQuestion", "fcAnswer", "fcDeckId") FROM stdin;
5	What is an absolute url?	An absolute URL is a 'full' URL or one that contains the entire address of the page. These types of URLs are often found when a website is linking out to another website that is not using the same server as your website.\n	1
6	What is the cleanest way to style your webpage?	external styling	1
7	What does HTML stand for?	Hyper Text Markup Language	1
8	Absolute File Paths	It describes the full address(URL) to access an internet file.\n<img src=”https://media.geeksforgeeks.org/wp-content/uploads/geek.png” alt=”My Image”>	1
9	Relative File Paths	It describes the path of the file relative to the location of the current web page file.\n\nExample 1: It shows the path of the file present in the same folder of the current web page file.\n<!DOCTYPE html> \n<html> \n    <head> \n        <title>Relative file path</title> \n    </head> \n    <body> \n        <h2>File present in the same folder</h2> \n        <img src="images/geeks.jpg" alt="My Image" style="width:400px"> \n    </body> \n</html>    	1
10	Where do you put non-visible content about the HTML document	in the <head> tag	1
11	Where do you put visible content about the HTML document?	In the <body> tag	1
12	What is the purpose of <!DOCTYPE> declaration?	To tell the browser which version of HTML the page is using	1
13	What is the purpose of HTML attributes?	Attributes provide additional information about the content of an HTML element	1
14	What other ways can we use an anchor tag?	link to another website, link to another part of the same page, linking emails, clickable image	1
15	How do you indicate the parent folder in a path?	../	1
16	How do you indicate the grandparent folder in a path?	../../	1
17	What are six primary HTML elements used for creating a table?	<table>, <thead>, <tbody>, <th>, <tr>, <td>	1
18	What purpose to <thead> and <tbody> elements serve?	They help delineate which part of the table is the head and which part is the body	1
\.


--
-- Data for Name: notebooks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notebooks ("notebookId", "studentId", "notebookName") FROM stdin;
1	1	HTML
2	1	React.js
3	1	Node.js
4	1	CSS
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notes ("noteId", "notebookId", "createdAt", "noteTitle", "noteContent", "noteDifficulty", "noteResource", "noteCode") FROM stdin;
23	1	2020-07-02 17:52:36.991685+00	Anchor Tags	An anchor tag is an HTML tag. It is used to define the beginning and end of a hypertext link. Search engines use the tag to determine the subject matter of the destination URL. Users click on the anchor text to reach the link target.	4	[]	{}
24	1	2020-07-02 18:07:21.503484+00	HTML Elements	An HTML element is defined by a start tag, some content, and an end tag.\n\nex):\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>	1	[]	{}
25	1	2020-07-02 18:10:26.528675+00	HTML Forms	A webform, web form or HTML form on a web page allows a user to enter data that is sent to a server for processing. Forms can resemble paper or database forms because web users fill out the forms using checkboxes, radio buttons, or text fields	1	[]	{}
26	1	2020-07-02 18:12:47.443626+00	Using CSS w/ HTML	CSS can be added to HTML documents in 3 ways:\n\nInline - by using the style attribute inside HTML elements\nInternal - by using a <style> element in the <head> section\nExternal - by using a <link> element to link to an external CSS file	1	[]	{}
27	1	2020-07-02 18:15:01.504982+00	HTML Tables	The <table> tag defines an HTML table.\nEach table row is defined with a <tr> tag. Each table header is defined with a <th> tag. Each table data/cell is defined with a <td> tag.\nBy default, the text in <th> elements are bold and centered.\nBy default, the text in <td> elements are regular and left-aligned.	1	[]	{}
28	1	2020-07-02 18:16:45.460257+00	HTML Skeleton	<!DOCTYPE html>\n<html>\n\n<head>\n  <meta charset="utf-8">\n  <title></title>\n  <meta name="author" content="">\n  <meta name="description" content="">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n\n  <link href="css/normalize.css" rel="stylesheet">\n  <link href="css/style.css" rel="stylesheet">\n</head>\n\n<body>\n\n  <p>Hello, world!</p>\n\n  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>\n  <script src="js/script.js"></script>\n</body>\n\n</html>\n	1	[]	{}
29	1	2020-07-02 18:22:17.355235+00	What is HTML?	HTML stands for Hyper Text Markup Language\nHTML is the standard markup language for creating Web pages\nHTML describes the structure of a Web page\nHTML consists of a series of elements\nHTML elements tell the browser how to display the content\nHTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.	1	[]	{}
30	1	2020-07-02 18:24:55.653418+00	HTML Lists	Ordered Lists: An ordered list starts with the <ol> tag. Each list item starts with the <li> tag.\n<ol>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ol>\nUnordered Lists:  An unordered list starts with the <ul> tag. Each list item starts with the <li> tag.\n<ul>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ul>	2	[]	{}
31	1	2020-07-02 18:27:47.915352+00	HTML	Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript and VBScript.	1	[]	{}
32	1	2020-07-02 18:31:39.3803+00	HTML Paths	A file path specifies the location of a file inside a web folder structure. Its like an address of a file which helps the web browser to access the files. File paths are used to link external resources such as images, videos, style sheets, JavaScript, displaying other web pages etc.\n\nTo insert a file in a web page its source must be known. For example, the syntax (<img src=” ” alt=” “>) is used to insert an image file, where the path of the file is mentioned in the source (src).\nFile paths are of two types:\n\nAbsolute File Paths\nRelative File Paths	2	[]	{}
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students ("studentId", "firstName", "lastName", "createdAt") FROM stdin;
1	John	Nguyen	2020-06-23 19:47:11.960476+00
\.


--
-- Data for Name: tagRelations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."tagRelations" ("itemId", type, "tagId") FROM stdin;
5	fc	51
23	note	51
24	note	51
25	note	51
6	fc	51
26	note	51
27	note	51
28	note	51
7	fc	51
29	note	51
30	note	51
31	note	51
8	fc	51
9	fc	51
32	note	51
10	fc	51
11	fc	51
12	fc	51
13	fc	51
14	fc	51
15	fc	51
16	fc	51
17	fc	51
18	fc	51
\.


--
-- Data for Name: tagTable; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."tagTable" ("tagId", "tagName", "updatedAt") FROM stdin;
26	CSS	2020-06-28 22:02:22.561273+00
1	HTML	2020-06-30 04:41:15.787818+00
6	variables	2020-06-30 04:41:15.787818+00
7	javascript	2020-06-30 04:41:15.787818+00
51		2020-07-02 18:57:11.657743+00
\.


--
-- Name: fcDeck_fcDeckId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."fcDeck_fcDeckId_seq"', 1, true);


--
-- Name: fcItem_fcId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."fcItem_fcId_seq"', 18, true);


--
-- Name: notebooks_notebookId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."notebooks_notebookId_seq"', 4, true);


--
-- Name: notes_noteId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."notes_noteId_seq"', 32, true);


--
-- Name: students_studentId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."students_studentId_seq"', 1, true);


--
-- Name: tagTable_tagId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."tagTable_tagId_seq"', 82, true);


--
-- Name: fcDeck fcDeck_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."fcDeck"
    ADD CONSTRAINT "fcDeck_pkey" PRIMARY KEY ("fcDeckId");


--
-- Name: fcItem fcItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."fcItem"
    ADD CONSTRAINT "fcItem_pkey" PRIMARY KEY ("fcId");


--
-- Name: notebooks notebooks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notebooks
    ADD CONSTRAINT notebooks_pkey PRIMARY KEY ("notebookId");


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY ("noteId");


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY ("studentId");


--
-- Name: tagTable tagTable_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tagTable"
    ADD CONSTRAINT "tagTable_pkey" PRIMARY KEY ("tagId");


--
-- Name: tagRelations unique_entries; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tagRelations"
    ADD CONSTRAINT unique_entries UNIQUE ("itemId", type, "tagId");


--
-- Name: tagTable unique_tag_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tagTable"
    ADD CONSTRAINT unique_tag_name UNIQUE ("tagName");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

