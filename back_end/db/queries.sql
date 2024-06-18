-- Queries
select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
from instituciones a, charlas b, charla_tiene_estudiantes c
where a.instituciones_id = b.instituciones_instituciones_id and b.charlas_id = c.charlas_charlas_id
group by b.charlas_id;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
from instituciones a
left join charlas b on a.instituciones_id = b.instituciones_instituciones_id 
left join charla_tiene_estudiantes c on b.charlas_id = c.charlas_charlas_id
group by b.charlas_id;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
from instituciones a
right join charlas b on a.instituciones_id = b.instituciones_instituciones_id
left join charla_tiene_estudiantes c on b.charlas_id = c.charlas_charlas_id
where b.instituciones_instituciones_id = 7
group by b.charlas_id;

select * from instituciones;
select * from charlas;
select * from charla_tiene_estudiantes;

SELECT a.charlas_id, a.nombrecharla, b.flag
from charlas a, charla_tiene_estudiantes b
where a.charlas_id = b.charlas_charlas_id and b.flag= 1;

SELECT instituciones_id, nombre, email, institucion, telefono, resena, telefonowp, ubicacion,  
GROUP_CONCAT(DISTINCT l.llave) AS links_llaves, 
GROUP_CONCAT(DISTINCT l.url) AS links_redes,  
GROUP_CONCAT(DISTINCT m.url) AS links_img,  
GROUP_CONCAT(DISTINCT v.url) AS links_videos  
FROM instituciones a  
LEFT JOIN Institucion_tiene_links l ON a.INSTITUCIONES_ID = l.instituciones_instituciones_id  
LEFT JOIN instituciones_tiene_imagenes m ON m.instituciones_instituciones_id = a.INSTITUCIONES_ID  
LEFT JOIN instituciones_tiene_videos v ON v.instituciones_instituciones_id = a.INSTITUCIONES_ID
GROUP BY a.INSTITUCIONES_ID;

SELECT * FROM INSTITUCIONES A LEFT JOIN Institucion_tiene_links B ON A.instituciones_id = B.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_imagenes C ON A.instituciones_id = C.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_videos D ON A.instituciones_id = D.instituciones_instituciones_id;

SELECT MainTable.main_key, GROUP_CONCAT(SecondaryTable.attribute) AS attribute_list
FROM MainTable
JOIN SecondaryTable ON MainTable.secondary_key = SecondaryTable.secondary_key
GROUP BY MainTable.main_key;

SELECT INSTITUCIONES_ID, GROUP_CONCAT(b.url) AS attribute_list
FROM INSTITUCIONES A
JOIN instituciones_tiene_imagenes B ON A.INSTITUCIONES_ID = B.instituciones_instituciones_id
GROUP BY A.INSTITUCIONES_ID;

SELECT * FROM cuenta;
SELECT * FROM CHARLAS WHERE INSTITUCIONES_INSTITUCIONES_ID = 4;
SELECT * FROM CHARLAS;
SELECT * FROM Charla_tiene_estudiantes;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, c.estudcha_id
from instituciones a, charlas b, charla_tiene_estudiantes c
where a.instituciones_id = b.instituciones_instituciones_id and b.charlas_id = c.charlas_charlas_id and c.cuenta_cuenta_id = 1;

DELETE FROM charla_tiene_estudiantes WHERE estudcha_id = 12;
SELECT * FROM charla_tiene_estudiantes;
TRUNCATE TABLE CHARLAS;
desc charlas;
select now();
