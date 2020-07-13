import React, { Component } from 'react'
import { isAutheticated } from '../../services/Auth/Auth';
import { getBlogById } from '../../services/Blog/Blog';
import Base from '../Base/Base';
import { titleCase } from '../../utils/StingsFunction';
class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: isAutheticated(),
            blogId: this.props.match.params.id,
            blog: null,
            loading: false
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const response = await getBlogById(this.state.blogId);
            if (response.ok)
                this.setState({ blog: response.data, loading: false });
            console.log(response.message);

        } catch (err) {
            console.error(err);
        }
    }

    editBlog = () => {
        this.props.history.push({
            pathname: '/createblog',
            state: { ...this.state.blog, update: true }
        })
    }

    render() {
        let { blog } = this.state;
        if (!blog) return (<h1>No blog found...</h1>)

        return (
            <Base>
                <div className="container justify-center align-center ">
                    <div className="width-60">
                        <div className="container align-center">
                            <h1 className="heading-1 inline">{titleCase(blog.title)}</h1>
                            <b className="badge right" onClick={this.editBlog}><span className="fa fa-pencil"/> Edit</b>
                        </div>
                        <div className="container align-center">
                            <span className="fa fa-user-circle fa-2x" /> &nbsp;&nbsp;&nbsp;
                                <div className="container col justify-center">
                                <b>{titleCase(blog.author.name)}</b>
                                <span className="font-size-date">{(new Date(blog.createdAt)).toDateString()}</span>
                            </div>
                            <b className="badge right">{titleCase(blog.category.name)}</b>
                        </div>


                        <div>{(blog.links).map(l => {
                            return <h6 key={l}><span className="btn-more" onClick={() => window.open(l)}>http://{l}</span></h6>
                        })}</div>

                        <p className="content">
                            {/* {blog.content} */}I always used to wonder how these amazing websites are being created? What am I missing out or what goes wrong which makes my website less attractive? So to answer these queries, this article will surely help you out to design your next amazing web site.
1. Layout -

The most important thing is where to place what type of content and how website layout would look in small screen, medium screen and large devices, This problem can be solved by using different types of layout for different devices. For mobile most of the websites uses Single column layout and for larger devices there are multiple layouts -
Split Screen Layout,
Asymmetrical layout,
Grid Layout,
Box Layout,
N Column Layout
2. Responsive Web Design -

To create websites more attractive and dynamic for any devices such as mobiles, tablet, laptop and desktop responsive design is and important thing to consider. Now there is a question how to do achieve it?
You should always go with mobile first approach i.e. designing website for mobile then for tablet, laptop and lastly for desktops. Their are CSS libraries and frameworks available for example Bootstarp, Foundation CSS, Sementic UI and many more to easily design responsive web site but if you don’t want to use any framework and library you can also go with CSS Flexbox or CSS Grid layout (both have different use cases so choose accordingly) used along with media queries.
3. Colour Palette -
As Colours are having a powerful effect on our emotion, so before making any choice of colours and theme for any website find out what your brand simulates such as Red simulates Power, Passion, Energy etc and Blue simulates Trust, Loyalty, Security etc.
Selecting colours which give contrast effects and also simulates your brand could be easily achieve by using -
Colour wheel just by selecting primary colour and 180 degree opposite to that secondary colour, or
You can use colour palette having colour grouped together.
4. Pictures and Illustrators -
To express anything picture is the best way because “a picture speaks thousand words”. Always try to select picture with colour matching to your theme that looks attractive as you might have seen many website are now using illustration because of two reason it reduces the size of an image and it also looks good and can be customised with theme colour. There are many free illustrators available on internet you use those.
Always use SVG format for illustrator and use JPEG or JPG for images with lots of color and PNG for simple images that will help you to optimise your website without compromising the quality.
5. Typography -
We always want to good handwriting in our school days then we used to write alphabets in various design in calligraphy now when it comes to website design we have to choose fonts that looks simple and clear.
After choosing a font style their are many thing which could makes it look more attractive such as -
Changing font weight instead of using larger font size,
Changing colour shade and opacity,
Modifying font spacing, word spacing or line height also makes sense.
Conclusion -
When designing a website, it’s important to remember that website should be accessible, responsive and interactive. The primary purpose of the website remains to deliver message which we want to deliver should reach. And keep these things in mind while making your next website good luck.
About Me!
                        </p>
                    </div>
                </div>
            </Base>
        )
    }
}

export default Blog;