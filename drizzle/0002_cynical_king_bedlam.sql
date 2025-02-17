ALTER TABLE `usuarios` ADD `nombres` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `apellidos` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `genero` enum('M','F') NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `fechaNacimiento` date NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `correo` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `password` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `telefono` varchar(12) NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `estatus` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO';--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `email`;