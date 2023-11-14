/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_orderId_productId_key" ON "OrderLine"("orderId", "productId");
