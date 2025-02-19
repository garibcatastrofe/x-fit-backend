ALTER TABLE `clientes` MODIFY COLUMN `fecha_inicio` varchar(19) NOT NULL;--> statement-breakpoint
ALTER TABLE `clientes` MODIFY COLUMN `genero` varchar(1) NOT NULL;--> statement-breakpoint
ALTER TABLE `ponchadas` MODIFY COLUMN `fecha` varchar(19);--> statement-breakpoint
ALTER TABLE `usuarios` MODIFY COLUMN `fecha_nacimiento` varchar(19) NOT NULL;