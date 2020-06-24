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
    "tagName" text NOT NULL
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
1	Question 1	Answer 1	1
\.


--
-- Data for Name: notebooks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notebooks ("notebookId", "studentId", "notebookName") FROM stdin;
1	1	HTML
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notes ("noteId", "notebookId", "createdAt", "noteTitle", "noteContent", "noteDifficulty", "noteResource", "noteCode") FROM stdin;
1	1	2020-06-23 13:18:17.54502-07	HTML DOM Traversal	Here is the content for the note	5	[{"link": "www.github.com", "name": "Github Link"}, {"link": "www.youtube.com", "name": "youtube link"}]	[{"css": "filler", "html": "filler", "javascript": "filler"}]
2	1	2020-06-23 13:19:45.649218-07	HTML DOM Traversal	Here is the content for the note	5	[{"link": "www.github.com", "name": "Github Link"}, {"link": "www.youtube.com", "name": "youtube link"}]	[{"css": "filler", "html": "filler", "javascript": "filler"}]
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students ("studentId", "firstName", "lastName", "createdAt") FROM stdin;
1	John	Nguyen	2020-06-23 12:47:11.960476-07
\.


--
-- Data for Name: tagRelations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."tagRelations" ("itemId", type, "tagId") FROM stdin;
1	note	1
1	note	2
2	note	2
\.


--
-- Data for Name: tagTable; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."tagTable" ("tagId", "tagName") FROM stdin;
1	HTML
2	CSS rule declarations
\.


--
-- Name: fcDeck_fcDeckId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."fcDeck_fcDeckId_seq"', 1, true);


--
-- Name: fcItem_fcId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."fcItem_fcId_seq"', 1, true);


--
-- Name: notebooks_notebookId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."notebooks_notebookId_seq"', 1, true);


--
-- Name: notes_noteId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."notes_noteId_seq"', 2, true);


--
-- Name: students_studentId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."students_studentId_seq"', 1, true);


--
-- Name: tagTable_tagId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."tagTable_tagId_seq"', 4, true);


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

