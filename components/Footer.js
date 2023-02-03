

import { Question } from "./faq";
const Footer = () => {
    return (
        <>


            <footer className="border-t-2  border-x-2 rounded-3xl  md:border-t-4 md:border-x-4 new_footer_area bg_color_footer m-4">
                <div className="  flex flex-col items-center mt-4 py-2 w-full">

                    <h3 style={{ color: "rgb(103, 137, 131)" }} className="font-coiny text-2xl uppercase mt-4">

                        FAQ&#39;s

                    </h3>

                    <div className="App">

                        <div className="col-container">

                            <div className="col-side left">

                                <Question

                                    color="#3ABFEF"

                                    question="When can I register?"

                                    answer="Registration will open in late summer and close several weeks before hackTAMS. Dates will be announced later."

                                ></Question>

                                <Question

                                    color="#6270F0"

                                    question="Am I eligible to attend?"

                                    answer="To attend as a hacker, you need to be haogiha doihgaodiho sighaoshvxzoixvhozxhv aosifhasif"

                                ></Question>

                                <Question

                                    color="#3ABFEF"

                                    question="Another question here?"

                                    answer="The answer goes here and should be a nice length but not too lengthy as to scare the reader into not wanting to read the rest."

                                ></Question>



                            </div>



                        </div>

                    </div>

                </div>

                    <div className="footer_bottom item-center text-center">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-sm-7">
                                <p className="mb-0 f_400 f_size_18">&#169; HOUSE OF ANASAH Inc. 2023 All rights reserved.</p>
                                </div>
                              
                            </div>
                        </div>
                    </div>
        </footer>
        </>
    );
};

export default Footer;
