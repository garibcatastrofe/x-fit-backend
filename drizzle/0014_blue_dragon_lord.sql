ALTER TABLE `ponchadas` MODIFY COLUMN `fecha` varchar(19) NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` MODIFY COLUMN `fecha_inicio` varchar(19) NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` MODIFY COLUMN `fecha_vencimiento` varchar(19) NOT NULL;