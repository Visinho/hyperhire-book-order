import { ApiProperty } from "@nestjs/swagger";

export class createOrderDTO {
    @ApiProperty()
    customerId: string;

    
    @ApiProperty()
    bookId: string;
}