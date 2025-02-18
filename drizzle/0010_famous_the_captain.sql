ALTER TABLE `cliente_pago_membresia_promocion` DROP FOREIGN KEY `cliente_pago_membresia_promocion_cliente_id_clientes_id_fk`;
--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` DROP FOREIGN KEY `cliente_pago_membresia_promocion_pago_id_pagos_id_fk`;
--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` DROP FOREIGN KEY `cliente_pago_membresia_promocion_membresia_id_membresias_id_fk`;
--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` DROP FOREIGN KEY `cliente_pago_membresia_promocion_promocion_id_promociones_id_fk`;
--> statement-breakpoint
ALTER TABLE `clientes` DROP FOREIGN KEY `clientes_usuario_id_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `empleados` DROP FOREIGN KEY `empleados_usuario_id_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `ponchadas` DROP FOREIGN KEY `ponchadas_usuario_id_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` MODIFY COLUMN `cliente_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` MODIFY COLUMN `pago_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` MODIFY COLUMN `membresia_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` MODIFY COLUMN `promocion_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `clientes` MODIFY COLUMN `genero` varchar(2) NOT NULL;--> statement-breakpoint
ALTER TABLE `clientes` MODIFY COLUMN `tipo` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `clientes` MODIFY COLUMN `usuario_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ponchadas` MODIFY COLUMN `usuario_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_pago_id_pagos_id_fk` FOREIGN KEY (`pago_id`) REFERENCES `pagos`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_membresia_id_membresias_id_fk` FOREIGN KEY (`membresia_id`) REFERENCES `membresias`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cliente_pago_membresia_promocion` ADD CONSTRAINT `cliente_pago_membresia_promocion_promocion_id_promociones_id_fk` FOREIGN KEY (`promocion_id`) REFERENCES `promociones`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ponchadas` ADD CONSTRAINT `ponchadas_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;