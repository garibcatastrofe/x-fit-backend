DROP TABLE `cliente_pago_membresia_promocion`;--> statement-breakpoint
ALTER TABLE `pagos` ADD `membresia_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `pagos` ADD `cliente_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `pagos` ADD `promocion_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `pagos` ADD CONSTRAINT `pagos_membresia_id_membresias_id_fk` FOREIGN KEY (`membresia_id`) REFERENCES `membresias`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pagos` ADD CONSTRAINT `pagos_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pagos` ADD CONSTRAINT `pagos_promocion_id_promociones_id_fk` FOREIGN KEY (`promocion_id`) REFERENCES `promociones`(`id`) ON DELETE cascade ON UPDATE no action;