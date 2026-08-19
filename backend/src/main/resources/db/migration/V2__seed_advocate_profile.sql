INSERT INTO advocate_profile (
    full_name,
    designation,
    professional_bio,
    qualification,
    courts_of_practice,
    languages,
    phone,
    whatsapp,
    email,
    office_address,
    office_hours,
    photo_url
)
SELECT
    'Ashutosh Upadhyay',
    'Advocate',
    'Advocate practicing in Siddharthnagar, Uttar Pradesh.',
    NULL,
    'District Court Siddharthnagar',
    'Hindi, English',
    NULL,
    NULL,
    NULL,
    'Siddharthnagar, Uttar Pradesh, India',
    NULL,
    NULL
    WHERE NOT EXISTS (
    SELECT 1
    FROM advocate_profile
);