# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

artists = User.create!([{username: 'Gluestick (feat. Vadim Fainberg)',
                        email: 'vadim@punk.com',
                        password: 'manmythlegend'},
                       {username: 'RhythmAndJews',
                        email: 'rnj@gmail.com',
                        password: 'rhythmandjuice'},
                       {username: 'Beethoven',
                        email: 'notthedog@timemachine.org',
                        password: 'notmozart'},
                       {username: 'Chopin',
                        email: 'chopin@chopin.chopin',
                        password: 'notmozart'},
                       {username: 'Guest',
                        email: 'guest@whatever.nope',
                        password: 'iamtheguest'}])

fans = User.create!([{username: 'Kirk',
                      email: 'boldlygo@enterprise.io',
                      password: 'shatner'},
                     {username: 'Spock',
                      email: 'LLAP@enterprise.io',
                      password: 'logical'},
                     {username: 'Uhura',
                      email: 'thebest@enterprise.io',
                      password: 'clearly'}])

guest = artists[4]

rev = guest.playlists.create!(title: 'Next Level Music')

track = guest.uploaded_tracks.create!(title: 'Plane & Car: The Remix')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Airplane_Taxi_Long.mp3"
track.audio = audio
track.amplitudes = [32, 89, 165, 207, 172, 236, 218, 267, 277, 217, 237, 327, 315,
                    216, 216, 293, 385, 265, 280, 308, 342, 342, 297, 289, 334,
                    339, 362, 332, 331, 309, 344, 315, 371, 312, 353, 424, 442,
                    545, 576, 571, 346, 341, 355, 175, 118, 128, 120, 122, 114,
                    99, 99, 113, 110, 134, 115, 221, 288, 323, 176, 197, 199, 168,
                    197, 214, 215, 220, 266, 270, 299, 317, 317, 347, 383, 360,
                    397, 385, 451, 408, 494, 496, 492, 470, 407, 373, 363, 351,
                    319, 294, 262, 230, 171, 163, 182, 202, 238, 392, 430, 435,
                    401, 436, 402, 425, 455, 481, 421, 422, 448, 455, 483, 485,
                    443, 432, 438, 406, 385, 390, 473, 278, 179, 168, 164, 258,
                    295, 269, 237, 224, 212, 197, 169, 126, 124, 136, 105, 75,
                    47, 30, 19, 12, 6, 2]
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

track = guest.uploaded_tracks.create!(title: 'WeeOooo')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Ambulance_Drive_Siren.mp3"
track.audio = audio
track.amplitudes = [30, 19, 19, 73, 22, 22, 25, 29, 31, 34, 191, 153, 200, 159,
                    178, 148, 159, 166, 179, 149, 120, 188, 176, 168, 160, 164,
                    166, 176, 189, 135, 181, 170, 213, 159, 186, 175, 201, 175,
                    177, 175, 187, 150, 170, 173, 180, 187, 176, 179, 175, 179,
                    181, 182, 179, 184, 190, 169, 154, 163, 187, 195, 184, 177,
                    186, 198, 196, 143, 180, 149, 205, 153, 171, 171, 208, 174,
                    174, 173, 151, 123, 178, 176, 161, 132, 136, 143, 154, 185,
                    214, 164, 153, 170, 180, 160, 146, 148, 152, 124, 161, 186,
                    203, 199, 172, 200, 154, 192, 181, 163, 190, 204, 183, 191,
                    177, 151, 156, 168, 166, 179, 155, 147, 134, 124, 86, 69, 15,
                    15, 14, 80, 58, 121, 113, 135, 114, 124, 15, 15, 72, 31, 16,
                    12, 9, 3]
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

track = guest.uploaded_tracks.create!(title: 'Bowling For Poop')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Bowling_pin_set.mp3"
track.audio = audio
track.amplitudes = [289, 205, 211, 188, 208, 154, 109, 161, 114, 104, 182, 102,
                    115, 83, 132, 107, 141, 83, 103, 657, 147, 74, 66, 59, 55,
                    62, 57, 57, 57, 58, 56, 61, 60, 63, 57, 62, 57, 59, 60, 63,
                    63, 56, 57, 59, 67, 62, 59, 61, 61, 58, 63, 60, 58, 61, 65,
                    59, 59, 61, 62, 57, 66, 61, 62, 64, 62, 63, 64, 64, 59, 62,
                    64, 59, 57, 59, 59, 60, 56, 58, 60, 59, 58, 59, 57, 58, 62,
                    61, 59, 58, 57, 64, 67, 69, 70, 78, 83, 83, 82, 85, 77, 84,
                    81, 80, 86, 80, 78, 88, 79, 73, 81, 80, 76, 85, 73, 82, 79,
                    81, 77, 77, 80, 87, 90, 96, 76, 77, 81, 82, 84, 86, 79, 84,
                    86, 86, 79, 82, 90, 88, 83, 90, 82, 57]
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

track = guest.uploaded_tracks.create!(title: 'This Music Is Garbage')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Cans_into_Bag.mp3"
track.audio = audio
track.amplitudes = [861, 277, 125, 518, 232, 472, 410, 159, 722, 1035, 288, 269,
                    210, 302, 359, 257, 333, 241, 336, 335, 597, 298, 366, 335,
                    468, 863, 394, 937, 323, 331, 738, 669, 519, 560, 390, 255,
                    480, 266, 358, 355, 188, 395, 388, 215, 308, 279, 391, 496,
                    398, 552, 292, 469, 532, 280, 215, 356, 392, 348, 401, 161,
                    445, 160, 383, 124, 178, 285, 53, 184, 149, 66, 454, 251, 198,
                    376, 572, 53, 13, 35, 17, 36, 126, 560, 181, 178, 142, 112,
                    118, 35, 26, 29, 30, 57, 80, 234, 325, 119, 247, 136, 113,
                    113, 141, 282, 276, 225, 174, 265, 437, 407, 511, 1450, 876,
                    389, 527, 311, 193, 305, 122, 73, 196, 385, 107, 212, 202, 102,
                    410, 130, 296, 430, 463, 54, 645, 396, 103, 360, 403, 414, 693,
                    399, 33, 0]
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

rnj = artists[1]

rnj_pic = "https://s3.amazonaws.com/soundsallaround-pro/seeds/rnj.jpg"
rnj.image = rnj_pic
rnj.save!

cym = rnj.playlists.create!(title: 'Call Your Mother')

track = rnj.uploaded_tracks.create!(title: 'Killing Me Softly')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Killing_Me_Softly.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [5, 2899, 1932, 2279, 2714, 1991, 2615, 3156, 3393, 2602, 3544,
                    2710, 2141, 2395, 2345, 2206, 4218, 2193, 1499, 3089, 3758,
                    3040, 2683, 1862, 3332, 4155, 4161, 2694, 3095, 2433, 3519,
                    3272, 4396, 3256, 2592, 3357, 2699, 2167, 2663, 3876, 3692,
                    2974, 3109, 2320, 2434, 3053, 3173, 3290, 4339, 4352, 2316,
                    3070, 3655, 2990, 2814, 2231, 3536, 4703, 2987, 4668, 2528,
                    3186, 2659, 3048, 3798, 4076, 2732, 2747, 3645, 2390, 2450,
                    2573, 3571, 3816, 3015, 3781, 2708, 2144, 2536, 2220, 2359,
                    3923, 4100, 3176, 4922, 3820, 5062, 4108, 2873, 5022, 3896,
                    4635, 3582, 4073, 4840, 3970, 4120, 3413, 3267, 4012, 5230,
                    3854, 3644, 2531, 3659, 3482, 2474, 2336, 3541, 3884, 3033,
                    3585, 2674, 1947, 2367, 2329, 1175, 2044, 1979, 2155, 2625,
                    3578, 3512, 4220, 5327, 3356, 3229, 3758, 2478, 3258, 3235,
                    1753, 1976, 2069, 751, 2678, 3480, 3206, 377, 5]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: 'Kmo Gvarim')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Kmo_Gvarim.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [376, 424, 346, 382, 422, 363, 1732, 1996, 1727, 2691, 3553,
                    2055, 2889, 3404, 1386, 2546, 3232, 2362, 2888, 3829, 2634,
                    2347, 2677, 1893, 2933, 1722, 2065, 2206, 3054, 3202, 2012,
                    1505, 1124, 2197, 3492, 2294, 3993, 3166, 2253, 1923, 3519,
                    2461, 3641, 3930, 2555, 1998, 3099, 1946, 2625, 2264, 2387,
                    2138, 2968, 2906, 3388, 3236, 1358, 2047, 1830, 1843, 2356,
                    2626, 3826, 2508, 1914, 2599, 2530, 2895, 5043, 2971, 3459,
                    4163, 2793, 3059, 4191, 2811, 3074, 3226, 1718, 2098, 3366,
                    4328, 4745, 4824, 4027, 2664, 3058, 3171, 3607, 3852, 2112,
                    4171, 3778, 2608, 3043, 4852, 2119, 3099, 3190, 1690, 1719,
                    1917, 3958, 3358, 4724, 4482, 3818, 3387, 2902, 2349, 3421,
                    2808, 2666, 3335, 2546, 2676, 3461, 1935, 2547, 3135, 2763,
                    2550, 1905, 3231, 3610, 2123, 2659, 2993, 1734, 3109, 3544,
                    3466, 3947, 4497, 4070, 5192, 1349, 3, 3, 3]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Ahava K'tana")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Ahava+K%27tana.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [1, 170, 460, 421, 372, 528, 433, 622, 1480, 2262, 2923, 1741,
                    1503, 3350, 2127, 1782, 2573, 3023, 2653, 1942, 2925, 3492,
                    3684, 3545, 3954, 7722, 4112, 2700, 4275, 2672, 2213, 3464,
                    6138, 2704, 3852, 5511, 4748, 3917, 6502, 5425, 2945, 4849,
                    6158, 3184, 2530, 2707, 3840, 3223, 2526, 4975, 4004, 4607,
                    4360, 5979, 6972, 6142, 3425, 5992, 5564, 3223, 2469, 3644,
                    3405, 4438, 2337, 3721, 4717, 4182, 3672, 5724, 8149, 3289,
                    3980, 4551, 3261, 2215, 2334, 3035, 2656, 2268, 3890, 3306,
                    4249, 4375, 6457, 7741, 7128, 3980, 5677, 5521, 3544, 1976,
                    2491, 2912, 5089, 4348, 5084, 4355, 4326, 5521, 6636, 5095,
                    4611, 5796, 4873, 3804, 5773, 4939, 4681, 4751, 6308, 8345,
                    8118, 5991, 6997, 7838, 5088, 5873, 6954, 6185, 4713, 7073,
                    6549, 5128, 6913, 7507, 5519, 4371, 5803, 4515, 2255, 1612,
                    1565, 2275, 2363, 2348, 661, 302, 55, 3]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Ani V'ata")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Ani+V%27ata.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [7, 328, 367, 539, 584, 357, 933, 1596, 1441, 810, 2479, 4299,
                    3507, 3412, 2165, 1490, 1407, 1251, 2714, 4259, 2461, 3925,
                    3930, 2879, 3787, 3145, 3295, 4964, 4143, 4532, 4676, 3464,
                    4810, 3432, 3589, 4244, 2367, 2529, 2213, 3073, 2712, 2149,
                    1963, 2146, 2931, 2588, 2365, 2277, 3711, 3969, 3763, 3208,
                    3861, 2536, 2592, 2894, 3207, 4447, 3474, 2772, 4220, 2852,
                    2188, 1809, 3159, 2972, 2321, 1334, 3013, 2441, 3089, 2243,
                    2316, 3969, 3704, 3643, 3684, 4395, 2476, 1926, 3296, 3028,
                    2769, 3406, 3018, 3125, 2429, 3185, 3263, 4557, 3871, 3312,
                    3965, 3496, 3480, 4069, 4030, 4789, 4145, 4446, 4070, 4347,
                    4227, 4102, 3585, 4214, 3938, 2372, 2290, 2890, 2384, 2313,
                    1578, 3295, 2453, 2455, 3019, 2762, 3088, 2967, 3025, 3013,
                    3466, 2662, 2129, 2806, 2850, 2780, 3041, 5028, 4277, 3842,
                    5040, 2938, 3751, 1951, 2863, 3061, 2182, 400]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Istanbul (Not Constantinople)")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Istanbul.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [2634, 2366, 2428, 2128, 2308, 2711, 2790, 2786, 2140, 2380,
                    2584, 2631, 1869, 1956, 2035, 1870, 1996, 2233, 2661, 2341,
                    2709, 1155, 2447, 2626, 2313, 2698, 2365, 2746, 2439, 2558,
                    2158, 2684, 2361, 2705, 2550, 2391, 3204, 3140, 2195, 3156,
                    2407, 2660, 2066, 2212, 3221, 1482, 1847, 2221, 2439, 2877,
                    2186, 2912, 2505, 2748, 2242, 1879, 2178, 2098, 2933, 5376,
                    4722, 5390, 4642, 5474, 4659, 1743, 3190, 4283, 5373, 4848,
                    5540, 4635, 5443, 3762, 2201, 3067, 2969, 2203, 2724, 1558,
                    2718, 2968, 1338, 3150, 5518, 4943, 4761, 4724, 3636, 2747,
                    3191, 2489, 1870, 2125, 1585, 1062, 1021, 1251, 1362, 1125,
                    1333, 1318, 1358, 1410, 2136, 2302, 2147, 2293, 2043, 2606,
                    2143, 1637, 1044, 1193, 1055, 1239, 477, 822, 722, 930, 998,
                    3103, 3844, 3491, 3330, 3478, 3302, 2975, 2738, 1596, 2710,
                    2888, 3791, 3410, 1872, 3459, 3861, 3506, 53, 8]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Lady Madonna")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Lady+Madonna.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [3511, 2994, 2776, 2927, 2278, 2970, 2900, 2976, 2481, 5819,
                    5465, 4805, 4516, 3656, 5554, 4437, 5075, 3781, 4836, 5530,
                    4378, 5743, 3661, 4615, 5189, 5784, 4540, 5501, 4902, 4529,
                    4836, 2685, 5556, 4573, 4118, 2118, 4610, 5707, 4930, 4849,
                    2880, 5025, 6516, 7020, 4624, 5075, 5760, 4931, 4979, 3180,
                    5839, 4842, 5786, 6276, 7427, 5168, 2972, 3648, 2923, 3737,
                    3157, 2815, 3619, 2797, 3576, 3815, 4231, 2206, 3653, 3684,
                    3999, 4764, 3399, 5888, 5383, 4194, 6183, 3077, 4972, 4863,
                    4341, 4567, 5260, 5159, 5875, 3961, 4483, 5384, 5294, 5983,
                    6051, 6564, 6296, 6412, 5137, 3594, 3039, 2816, 4625, 2960,
                    5233, 5715, 6203, 2593, 5485, 4804, 5261, 3041, 3902, 5599,
                    5702, 6650, 2273, 4277, 4939, 4449, 4991, 4726, 4458, 5039,
                    4575, 5209, 4457, 5311, 3382, 5304, 5030, 4691, 5937, 5077,
                    4944, 4839, 5064, 5288, 3910, 3519, 2846, 2814, 1311, 8]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "My Goyim Friends")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/My+Goyim+Friends.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [2998, 2040, 4398, 2825, 3551, 3631, 3990, 3710, 3753, 1930,
                    2274, 1119, 1849, 2036, 2674, 1414, 1319, 3476, 3984, 4024,
                    2922, 3291, 3551, 3809, 2894, 2190, 3272, 4159, 3950, 3821,
                    4218, 4572, 5160, 3228, 4655, 3183, 4890, 5742, 3285, 2949,
                    2322, 4444, 3452, 4813, 2421, 3957, 2132, 2087, 1976, 2062,
                    2398, 2288, 1888, 1457, 3866, 3972, 3491, 2541, 3983, 4327,
                    3683, 2428, 2804, 3260, 4506, 3869, 4996, 4695, 4738, 4246,
                    4248, 3850, 3594, 4241, 2599, 2393, 3455, 3476, 2972, 3612,
                    4399, 4511, 4304, 4324, 2749, 3872, 3971, 998, 1619, 2556,
                    2205, 1153, 1519, 2739, 3926, 6479, 7066, 4097, 4109, 3815,
                    2642, 3500, 3913, 3931, 2771, 2842, 3257, 4625, 4123, 4796,
                    4500, 5530, 5068, 4325, 3954, 2203, 3419, 3820, 3712, 1450,
                    2874, 3921, 3926, 4318, 4182, 3867, 3999, 4193, 4065, 3927,
                    4104, 3650, 3729, 2289, 2763, 3622, 4188, 3720, 3236, 1242]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Rov Hasha'ot")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Rov.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [2899, 2262, 2082, 1969, 2660, 2509, 3089, 2859, 2575, 1953,
                    764, 255, 1249, 2584, 1326, 1199, 1645, 533, 1477, 1493, 1018,
                    1777, 987, 1405, 2644, 2771, 2735, 3067, 1707, 2259, 2655,
                    2531, 2101, 1958, 1609, 2344, 2456, 2433, 2535, 2602, 3118,
                    3336, 3059, 3004, 3445, 3255, 3628, 4028, 3738, 4188, 3887,
                    4195, 4615, 4688, 3541, 3703, 4014, 3790, 4835, 3629, 2713,
                    2568, 2159, 2308, 2675, 1955, 2642, 2620, 2223, 1946, 1485,
                    1259, 1086, 1027, 1049, 1139, 1334, 1934, 2652, 4168, 4088,
                    5216, 4253, 3600, 3595, 4602, 4418, 3493, 3587, 3768, 2946,
                    4453, 4435, 4633, 4537, 3898, 4168, 4953, 3856, 3247, 3639,
                    3546, 1893, 1145, 5046, 5520, 4964, 5366, 6094, 5194, 5106,
                    4369, 3599, 1585, 2009, 2145, 2082, 2237, 2315, 2462, 2086,
                    1970, 2378, 2897, 2688, 2325, 2087, 2292, 1975, 2444, 1352,
                    1191, 1224, 768, 1033, 399, 183, 106, 6, 6]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Title of the Song")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Title+Of+The+Song.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [2, 66, 852, 1117, 1086, 679, 1358, 1458, 2007, 603, 1847,
                    1078, 1187, 768, 1541, 1238, 1973, 884, 1294, 1258, 1200,
                    1163, 1479, 1029, 431, 1377, 1273, 1438, 1093, 1464, 1540,
                    3098, 1971, 1750, 1517, 1728, 1760, 2150, 3054, 3136, 2773,
                    2159, 2808, 1720, 2409, 3184, 4421, 1577, 3046, 2266, 3626,
                    3215, 2171, 1790, 2606, 783, 1789, 1989, 1560, 865, 1477,
                    1424, 491, 1171, 1345, 1203, 1426, 1092, 989, 2138, 2009,
                    1509, 1156, 1889, 1313, 2225, 1806, 3654, 2632, 3026, 1931,
                    2415, 1692, 2688, 4397, 3745, 2280, 2484, 3209, 4223, 1988,
                    1619, 2722, 1306, 2060, 1193, 1887, 1365, 2258, 1905, 1783,
                    1701, 2083, 1777, 1697, 3139, 2407, 2602, 3990, 5898, 5484,
                    4893, 4546, 4126, 4347, 4278, 2134, 1819, 2812, 2346, 2933,
                    1998, 588, 2271, 2265, 2543, 2671, 2425, 706, 1208, 1710,
                    1508, 1463, 908, 524, 556, 433, 474, 71, 1]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Valerie")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Valerie.mp3"
track.audio = audio
track.image = rnj_pic
track.amplitudes = [815, 778, 985, 974, 773, 1060, 2499, 2862, 2407, 3333, 1770,
                    1447, 2209, 2427, 2296, 3894, 4284, 1744, 2172, 3719, 3792,
                    3247, 3776, 3744, 3745, 3325, 3925, 4066, 5283, 5432, 3151,
                    2644, 1367, 1263, 2773, 3755, 1826, 3095, 2060, 1394, 2045,
                    4718, 2398, 2374, 2548, 1937, 2531, 3265, 2266, 1968, 2478,
                    2234, 3322, 3304, 3816, 1687, 2126, 3144, 1827, 3231, 2884,
                    1480, 1709, 3059, 2284, 3221, 2315, 2470, 1518, 2210, 3781,
                    3881, 3546, 4047, 4120, 3580, 3996, 3879, 4547, 6099, 5508,
                    4457, 3670, 1607, 1722, 5006, 3523, 2567, 4371, 1830, 2123,
                    2210, 2414, 1692, 2487, 1394, 1885, 1292, 1698, 2765, 1965,
                    913, 1163, 1509, 1384, 1813, 1884, 3594, 4915, 4987, 3888,
                    3684, 3028, 3871, 3943, 4036, 3847, 4102, 4691, 6606, 6392,
                    4964, 4029, 1646, 1642, 3244, 3885, 2174, 3251, 2402, 1958,
                    2219, 2352, 2463, 4129, 3340, 1700, 953, 323, 1]
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

bee = artists[2]

bee_pic = "https://s3.amazonaws.com/soundsallaround-pro/seeds/beethoven.jpg"
# bee_pic = File.open('app/assets/images/beethoven.jpg')
bee.image = bee_pic
bee.save!

sym = bee.playlists.create!(title: 'My Stuff')

track = bee.uploaded_tracks.create!(title: "9th Symphony Finale")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/9th_Symphony_Finale.mp3"
track.audio = audio
track.image = bee_pic
track.amplitudes = [598, 143, 523, 288, 170, 182, 71, 64, 125, 89, 53, 196, 166,
                    269, 184, 41, 18, 23, 16, 24, 55, 75, 104, 72, 88, 128, 157,
                    162, 294, 651, 740, 748, 793, 725, 676, 888, 122, 664, 705,
                    383, 567, 497, 392, 261, 289, 458, 625, 408, 619, 727, 908,
                    380, 649, 988, 1270, 1268, 1920, 1948, 5, 82, 181, 230, 286,
                    526, 735, 922, 1253, 1510, 491, 461, 500, 478, 313, 494, 447,
                    496, 285, 33, 1484, 1384, 1207, 1147, 951, 348, 484, 1044,
                    1053, 868, 534, 652, 1177, 971, 106, 135, 257, 779, 580, 1378,
                    919, 123, 282, 320, 886, 1147, 1135, 1344, 1337, 1129, 1215,
                    1284, 1816, 1570, 70, 383, 344, 354, 336, 150, 260, 713, 748,
                    1273, 829, 455, 720, 1302, 470, 567, 792, 530, 73, 888, 1863,
                    1524, 1949, 1458, 1280, 1994, 1104, 452]
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = bee.uploaded_tracks.create!(title: 'Moonlight Sonata')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Moonlight_Sonata.mp3"
track.audio = audio
track.image = bee_pic;
track.amplitudes = [54, 66, 79, 53, 74, 112, 96, 69, 58, 79, 99, 117, 104, 92,
                    83, 116, 60, 51, 48, 55, 103, 94, 138, 116, 142, 106, 90, 77,
                    62, 72, 201, 153, 126, 71, 178, 167, 135, 145, 149, 93, 73,
                    65, 77, 63, 74, 103, 210, 136, 225, 222, 299, 176, 291, 137,
                    109, 134, 103, 139, 103, 182, 86, 152, 84, 166, 156, 208, 237,
                    328, 363, 405, 204, 147, 112, 90, 78, 90, 94, 76, 79, 63, 58,
                    63, 79, 131, 89, 183, 139, 111, 88, 113, 62, 199, 123, 269,
                    232, 274, 151, 86, 78, 87, 79, 199, 141, 120, 110, 215, 137,
                    125, 123, 111, 76, 128, 141, 146, 181, 160, 75, 65, 61, 81,
                    127, 106, 162, 302, 130, 97, 107, 158, 133, 86, 69, 64, 64,
                    57, 31, 36, 41, 17, 9, 5]
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = bee.uploaded_tracks.create!(title: 'Fur Elise')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Fur_Elise_by_Beethoven.mp3"
track.audio = audio
track.image = bee_pic;
track.amplitudes = [52, 316, 319, 419, 205, 485, 389, 364, 308, 265, 389, 500, 424,
                    343, 370, 318, 257, 372, 592, 514, 370, 325, 387, 315, 430,
                    372, 472, 270, 530, 396, 271, 325, 488, 595, 421, 281, 539,
                    323, 403, 254, 346, 227, 325, 251, 342, 266, 439, 330, 546,
                    661, 539, 478, 517, 606, 444, 832, 642, 682, 575, 493, 182,
                    328, 110, 231, 312, 354, 428, 516, 409, 527, 473, 435, 514,
                    625, 549, 295, 380, 449, 441, 338, 274, 283, 188, 321, 280,
                    200, 361, 515, 540, 1099, 677, 667, 1137, 1051, 462, 619, 865,
                    1046, 697, 826, 791, 822, 356, 48, 147, 366, 920, 1079, 805,
                    270, 195, 287, 581, 254, 439, 428, 370, 390, 608, 562, 384,
                    356, 340, 304, 405, 290, 268, 242, 277, 275, 291, 200, 261,
                    121, 28, 2, 0, 0, 0, 0]
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = bee.uploaded_tracks.create!(title: 'Symphony No. 5')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Symphony_No_5_by_Beethoven.mp3"
track.audio = audio
track.image = bee_pic;
track.amplitudes = [460, 568, 185, 178, 619, 780, 1424, 127, 195, 486, 955, 1183,
                    1201, 649, 505, 204, 285, 234, 206, 582, 1195, 983, 1190, 729,
                    971, 766, 585, 481, 474, 132, 159, 483, 650, 1151, 87, 214,
                    421, 867, 1013, 1052, 538, 405, 167, 237, 200, 196, 543, 1053,
                    782, 1048, 669, 843, 724, 511, 814, 378, 187, 205, 219, 238,
                    337, 274, 316, 938, 956, 891, 667, 791, 550, 717, 638, 552,
                    344, 142, 162, 241, 1123, 250, 689, 1212, 1009, 1095, 197,
                    208, 352, 435, 230, 111, 62, 55, 210, 630, 598, 907, 882,
                    1029, 280, 136, 166, 190, 240, 282, 270, 852, 1325, 1064,
                    1106, 852, 808, 843, 999, 1275, 1106, 305, 1625, 498, 1241,
                    1102, 791, 877, 1207, 1290, 1140, 667, 504, 557, 521, 804,
                    833, 908, 1043, 1547, 1321, 497, 196, 1005, 1190, 422, 0, 0]
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

cho = artists[3]

cho_pic = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Chopin.jpg"
# cho_pic = File.open('app/assets/images/Chopin.jpg')
cho.image = cho_pic
cho.save!

sym = cho.playlists.create!(title: 'Chopin')

track = cho.uploaded_tracks.create!(title: "E Minor Prelude")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/E_Minor_Prelude.mp3"
track.audio = audio
track.image = cho_pic;
track.amplitudes = [472, 430, 725, 638, 673, 798, 1051, 547, 459, 744, 869, 1128,
                    840, 896, 719, 1231, 621, 537, 700, 895, 930, 990, 768, 813,
                    733, 540, 639, 580, 748, 1071, 698, 834, 668, 534, 457, 924,
                    761, 679, 628, 644, 1046, 673, 417, 404, 682, 1331, 687, 545,
                    413, 526, 576, 472, 463, 498, 280, 293, 664, 459, 732, 442,
                    285, 764, 494, 792, 689, 540, 398, 404, 938, 511, 570, 821,
                    651, 1063, 807, 875, 906, 792, 1364, 924, 1228, 1088, 1580,
                    1041, 1497, 1062, 1493, 1492, 1286, 1124, 1199, 735, 1172,
                    1326, 863, 684, 360, 487, 830, 552, 513, 411, 488, 646, 401,
                    766, 729, 917, 489, 484, 745, 915, 393, 867, 421, 340, 395,
                    527, 373, 736, 553, 495, 168, 47, 13, 169, 133, 56, 317, 119,
                    64, 274, 113, 46, 35, 29, 25, 9, 0, 0]
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = cho.uploaded_tracks.create!(title: "Funeral March")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Funeral_March_by_Chopin.mp3"
track.audio = audio
track.image = cho_pic;
track.amplitudes = [57, 71, 76, 98, 98, 126, 218, 117, 153, 162, 73, 106, 73, 356,
                    307, 144, 201, 220, 308, 887, 614, 886, 658, 273, 132, 142,
                    74, 86, 149, 760, 906, 665, 930, 297, 213, 79, 71, 61, 64,
                    42, 35, 107, 84, 155, 71, 87, 175, 153, 102, 42, 108, 92, 92,
                    194, 81, 155, 155, 136, 71, 34, 113, 91, 196, 226, 240, 209,
                    127, 60, 73, 57, 67, 59, 112, 58, 81, 134, 136, 107, 36, 79,
                    124, 110, 259, 195, 245, 94, 56, 82, 45, 68, 51, 62, 127, 55,
                    72, 108, 105, 84, 26, 19, 52, 84, 139, 209, 122, 260, 308, 292,
                    246, 148, 152, 144, 394, 408, 266, 323, 417, 434, 830, 709,
                    771, 556, 313, 147, 109, 83, 87, 475, 825, 493, 625, 396, 156,
                    103, 119, 48, 58, 49, 16, 5]
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)
