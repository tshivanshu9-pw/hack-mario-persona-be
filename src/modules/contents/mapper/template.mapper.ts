export class TemplateMapper {
    mapTemplate(templateName: string) {
        switch (templateName) {
            case 'template1':
                return `{
                    "elements": {
                        "root": {
                            "background_color": "#FFFFFF"
                        },
                        "path-1": {
                            "background_color": "#FFFFFF",
                            "hidden": false
                        },
                        "path-2": {
                            "background_color": "#D9D9D9",
                            "hidden": false
                        },
                        "bitmap": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_b49f2310-96c9-48ec-92c7-c5cc1b7a259e.jpeg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "mask": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_dbba5e20-ed65-4aab-bad6-c9df88a7297a.png",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "student_img": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_5bc47116-56c7-487c-8fa4-d6f741813d63.png",
                            "fitting_type": "cover",
                            "alignment": "bottom center",
                            "hidden": false
                        },
                        "bitmap-1": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_564be999-1aa5-4ea5-a0a5-e7f310609e5d.png",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "header-2": {
                            "payload": "{{ header_2 }}",
                            "color": "#EADC33",
                            "font_size": 130,
                            "font": "61567911-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 125,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 80
                        },
                        "path-13": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_60b90db2-2bbb-4f76-aaa5-eefa9dc01b69.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-14": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_a69e91ab-8460-46a5-9098-b5b6a8a4bb85.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-15": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_9a0da375-3c0c-4c4f-8d60-a47e6f12bbbd.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-16": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_b4250af6-cc80-4497-9e65-f32de068c9b0.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-17": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_51255ef4-2358-45ae-8597-8c6963858fdc.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-18": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_e87136ce-c242-48c4-802b-57649be58b0d.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-19": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_5c465e4f-b1db-4c71-abac-3ef29f5200ce.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-20": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_08680191-2faa-48a6-8e1c-3ea340d79022.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-21": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_db5ff877-0915-4f7e-a210-73abd2cad95e.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-22": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_e466c0b4-dd1c-471d-8cfe-4d492a39e59c.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-23": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_8577a3c7-62ba-4fad-91f9-2fe50c773a0f.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-24": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_ba6f6fd3-82a5-4f6e-b7b9-2b4c4be6d251.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-25": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_944f594f-3e5e-4061-b9b7-0e08a8640840.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-26": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/3793a7c7-c733-4116-bb48-135e3ebf0275/v2_f659c1c8-b9ff-4bf0-9b35-7c863b49f620.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "header_1": {
                            "payload": "{{ header_1 }}",
                            "color": "#EADC33",
                            "font_size": 130,
                            "font": "61567911-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 125,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 79
                        },
                        "batch_name": {
                            "payload": "{{ batch_name }}",
                            "color": "#FEFEFE",
                            "font_size": 75,
                            "font": "61567911-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 125,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 50
                        },
                        "class_details": {
                            "payload": "{{ class_details }}",
                            "color": "#FFFFFF",
                            "font_size": 75,
                            "font": "61567911-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 60
                        },
                        "limited-time": {
                            "payload": "Limited Time:",
                            "color": "#FFFFFF",
                            "font_size": 60,
                            "font": "61567911-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 156,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 57
                        },
                        "price": {
                            "payload": "{{ price }}",
                            "color": "#FFFFFF",
                            "font_size": 128,
                            "font": "61567911-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 87,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 122
                        }
                    }
                }`;
            case 'template2':
                return `{
                    "elements": {
                        "root": {
                            "background_color": "#FFFFFF"
                        },
                        "bg_img": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/bdf395d7-f91b-45aa-93bd-c7a433cb2733/v2_6a14e734-66d0-41d9-9136-d28aecb863ac.jpeg",
                            "fitting_type": "cover",
                            "alignment": "middle center",
                            "hidden": false
                        },
                        "student_img": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/bdf395d7-f91b-45aa-93bd-c7a433cb2733/v2_0e3430ba-73b9-49d9-908d-99abe2c099d0.png",
                            "fitting_type": "cover",
                            "alignment": "middle center",
                            "hidden": false
                        },
                        "header_1": {
                            "payload": "{{ header_1 }}",
                            "color": "#000000",
                            "background_color": "#FBAB00",
                            "background_padding": "2.0 4.0",
                            "font_size": 20,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 600,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 6
                        },
                        "header_2": {
                            "payload": "{{ header_2 }}",
                            "color": "#000000",
                            "background_color": "#FBAB00",
                            "background_padding": "2.0 4.0",
                            "font_size": 20,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 600,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 6
                        },
                        "batch_name": {
                            "payload": "{{ batch_name }}",
                            "color": "#000000",
                            "font_size": 16,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 600,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 13
                        },
                        "tagline": {
                            "payload": "{{ tagline }}",
                            "color": "#000000",
                            "font_size": 13,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 12
                        },
                        "text_4": {
                            "payload": "Only At ",
                            "color": "#000000",
                            "font_size": 10,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false
                        },
                        "actual_price": {
                            "payload": "{{ actual_price }}",
                            "color": "#000000",
                            "font_size": 10,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 10
                        },
                        "offer_price": {
                            "payload": "{{ offer_price }}",
                            "color": "#000000",
                            "background_color": "#FFB500",
                            "background_padding": 1,
                            "font_size": 16,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 600,
                            "line_height": 130,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 13
                        },
                        "shape_0": {
                            "background_color": "#FFFFFF",
                            "hidden": false
                        },
                        "image_2": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/bdf395d7-f91b-45aa-93bd-c7a433cb2733/v2_22fa25ac-aee9-4d06-b579-970d0051160c.png",
                            "fitting_type": "fill",
                            "alignment": "middle center",
                            "hidden": false
                        }
                    }
                }`;
            case 'template3':
                return `{
                    "elements": {
                        "root": {
                            "background_color": "#FFFFFF"
                        },
                        "path-1": {
                            "background_color": "#FFFFFF",
                            "hidden": false
                        },
                        "path-2": {
                            "background_color": "#FFFFFF",
                            "hidden": false
                        },
                        "group": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_852ac55b-d31b-46d8-b4a1-442da7c7039d.jpeg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "bitmap": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_53a28fc0-64f7-4a55-8dfc-771ed617e3b8.jpeg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-7": {
                            "background_color": "#000000",
                            "hidden": false
                        },
                        "mask": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_d6087430-2b1e-4c2e-9c33-a100f8ecc577.png",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "mask-1": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_f6316199-7211-461a-99d2-1b6f94a04077.png",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-17": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_bdce4b98-0e0b-45c6-9f04-bf8540ff5464.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "path-18": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_c5cd9d01-c05e-4ea7-88b7-545c29e329ba.svg",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "mask-2": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_0a15ad1a-7ca7-4230-ad5e-d84be38a2d5b.png",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "student_img": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_06911d7c-13bd-4fce-9870-ca4640340df8.png",
                            "fitting_type": "cover",
                            "alignment": "middle center",
                            "hidden": false
                        },
                        "path-26": {
                            "background_color": "#000000",
                            "hidden": false
                        },
                        "student_name": {
                            "payload": "{{ student_name }}",
                            "color": "#FFFFFF",
                            "font_size": 72,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 500,
                            "line_height": 125,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 60
                        },
                        "testimonial": {
                            "payload": "{{ testimonial }}",
                            "color": "#FFFFFF",
                            "font_size": 75,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 400,
                            "line_height": 125,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 60
                        },
                        "pw_logo": {
                            "image_url": "https://production-banners.s3-eu-west-1.amazonaws.com/templates/v2/e8cee74f-8d9f-4673-913c-adc69def68b0/89e8b23c-f93c-468c-8469-40b03984db63/v2_28fd83f3-9320-4b4b-8f10-6171aabe8d34.png",
                            "fitting_type": "fill",
                            "alignment": "top left",
                            "hidden": false
                        },
                        "physics-wallah": {
                            "payload": "PHYSICS\nWALLAH",
                            "color": "#000000",
                            "font_size": 68,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 700,
                            "line_height": 139,
                            "alignment": "top left",
                            "hidden": false
                        },
                        "exam_score": {
                            "payload": "{{ exam_score }}",
                            "color": "#FFB000",
                            "font_size": 63,
                            "font": "6156907e-33c5-11ea-9877-92672c1b8195",
                            "font_weight": 600,
                            "line_height": 129,
                            "alignment": "top left",
                            "hidden": false,
                            "auto_resize": true,
                            "min_font_size": 55
                        }
                    }
                }`;
        }
    }
}