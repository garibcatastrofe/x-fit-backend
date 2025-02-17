CREATE TABLE `alimentos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(60) NOT NULL,
	`calorias` double NOT NULL,
	`proteinas` double NOT NULL,
	`carbohidratos` double NOT NULL,
	`grasas` double NOT NULL,
	`clasificacion` enum('PROTEINA','CARBOHIDRATOS','GRASAS','VEGETALES','FRUTAS','BEBIDAS','ENDULZANTES','SAZONADORES','SNACKS') DEFAULT 'PROTEINA',
	`unidad_medida` enum('MILILITROS','GRAMOS','PIEZA','REBANADA','MITAD','LATA','BOTELLA','SOBRE','TAZA','PORCION','CUCHARADA') DEFAULT 'MILILITROS',
	CONSTRAINT `alimentos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cliente_pago_membresia_promocion` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cliente_id` int,
	`pago_id` int,
	`membresia_id` int,
	`promocion_id` int,
	CONSTRAINT `cliente_pago_membresia_promocion_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dietas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cliente_id` int,
	CONSTRAINT `dietas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ejercicios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(50) NOT NULL,
	`descripcion` varchar(200) NOT NULL,
	`repeticiones` varchar(10) NOT NULL,
	`descanso` varchar(20) NOT NULL,
	`ejecucion` varchar(255) NOT NULL,
	`tempo` varchar(10) NOT NULL,
	`grupoMuscular` enum('PECTORAL','ESPALDA','TRAPECIO','DELTOIDES_ANTERIOR','DELTOIDES_MEDIO','DELTOIDES_POSTERIOR','TRICEPS','BICEPS','ANTEBRAZO','ABDOMEN','GLUTEOS','CUADRICEPS','ISQUIOSURALES','PANTORILLAS','ADUCTORES','CARDIOVASCULAR','CALENTAMIENTO') DEFAULT 'PECTORAL',
	CONSTRAINT `ejercicios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `empleados` (
	`id` int AUTO_INCREMENT NOT NULL,
	`puesto` varchar(20) NOT NULL,
	`isAdmin` enum('SI','NO') DEFAULT 'NO',
	`usuario_id` int,
	CONSTRAINT `empleados_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `encuestas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empleado_id` int,
	CONSTRAINT `encuestas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediciones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cliente_id` int,
	CONSTRAINT `mediciones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `membresias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(50),
	`precio` double NOT NULL,
	`duracionMeses` int NOT NULL,
	`descripcion` varchar(200) NOT NULL,
	CONSTRAINT `membresias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pagos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`monto` double NOT NULL,
	`fechaPago` date NOT NULL,
	`fechaVencimiento` date NOT NULL,
	CONSTRAINT `pagos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ponchadas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fecha` date NOT NULL,
	`usuario_id` int,
	CONSTRAINT `ponchadas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promociones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(50) NOT NULL,
	`descuento` double NOT NULL,
	`tipoDescuento` enum('PORCENTAJE','MONTO FIJO') DEFAULT 'PORCENTAJE',
	`fechaInicio` date NOT NULL,
	`fechaVencimiento` date NOT NULL,
	`estatus` enum('ACTIVA','INACTIVA') DEFAULT 'ACTIVA',
	CONSTRAINT `promociones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reportes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cliente_id` int,
	CONSTRAINT `reportes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `respuestas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`usuario_id` int,
	CONSTRAINT `respuestas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rutinas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cliente_id` int,
	CONSTRAINT `rutinas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(50) NOT NULL,
	`expiracion` date NOT NULL,
	`usuario_id` int,
	CONSTRAINT `tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `clientes` DROP FOREIGN KEY `clientes_empleado_id_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `clientes` ADD `usuario_id` int;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_pago_id_pagos_id_fk` FOREIGN KEY (`pago_id`) REFERENCES `pagos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_membresia_id_membresias_id_fk` FOREIGN KEY (`membresia_id`) REFERENCES `membresias`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_promocion_id_promociones_id_fk` FOREIGN KEY (`promocion_id`) REFERENCES `promociones`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dietas` ADD CONSTRAINT `dietas_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `encuestas` ADD CONSTRAINT `encuestas_empleado_id_empleados_id_fk` FOREIGN KEY (`empleado_id`) REFERENCES `empleados`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mediciones` ADD CONSTRAINT `mediciones_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ponchadas` ADD CONSTRAINT `ponchadas_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reportes` ADD CONSTRAINT `reportes_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `respuestas` ADD CONSTRAINT `respuestas_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rutinas` ADD CONSTRAINT `rutinas_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `clientes` DROP COLUMN `empleado_id`;