ALTER TABLE `empleados` MODIFY COLUMN `usuario_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `membresias` MODIFY COLUMN `nombre` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `pagos` MODIFY COLUMN `monto` int NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` MODIFY COLUMN `descuento` int NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` MODIFY COLUMN `estatus` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `empleados` ADD `is_admin` varchar(2) NOT NULL;--> statement-breakpoint
ALTER TABLE `membresias` ADD `duracion_meses` int NOT NULL;--> statement-breakpoint
ALTER TABLE `pagos` ADD `fecha_pago` date NOT NULL;--> statement-breakpoint
ALTER TABLE `pagos` ADD `fecha_vencimiento` date NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` ADD `tipo_descuento` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` ADD `fecha_inicio` date NOT NULL;--> statement-breakpoint
ALTER TABLE `promociones` ADD `fecha_vencimiento` date NOT NULL;--> statement-breakpoint
ALTER TABLE `empleados` DROP COLUMN `isAdmin`;--> statement-breakpoint
ALTER TABLE `membresias` DROP COLUMN `duracionMeses`;--> statement-breakpoint
ALTER TABLE `pagos` DROP COLUMN `fechaPago`;--> statement-breakpoint
ALTER TABLE `pagos` DROP COLUMN `fechaVencimiento`;--> statement-breakpoint
ALTER TABLE `promociones` DROP COLUMN `tipoDescuento`;--> statement-breakpoint
ALTER TABLE `promociones` DROP COLUMN `fechaInicio`;--> statement-breakpoint
ALTER TABLE `promociones` DROP COLUMN `fechaVencimiento`;